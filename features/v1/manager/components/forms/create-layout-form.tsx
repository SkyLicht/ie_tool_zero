"use client";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { FactoryLinesModel } from "@/features/types/factory-model";
import { ChevronDown, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createLayoutValidation } from "@/features/v1/manager/lib/create-layout-validation";
import { actionCreateLayout } from "@/features/v1/manager/actions/create-layout-action";
interface Item {
  key: string;
  value: string;
}

type Props = {
  factories: FactoryLinesModel[];
};

const CreateLayoutForm = ({ factories }: Props) => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<{ line?: Item }>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    // Extract form data into an object
    try {
      const formValues = {
        line_id: formData.get("line_id") as string,
      };

      await createLayoutValidation.parseAsync(formValues);

      const result = await actionCreateLayout(prevState, formData);

      if (result.status == "SUCCESS") {
        toast("Layout created successfully", {
          description: `${result.data.id}`,
        });

        router.push(`/v1/manager_layout/${result.data.id}`);
      }

      if (result.status == "ERROR") {
        toast.error("An unexpected error occurred", {
          description: result.error,
        });
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const fieldErrors = error.flatten().fieldErrors;
        const formattedErrors = Object.fromEntries(
          Object.entries(fieldErrors).map(([key, value]) => [
            key,
            value?.[0] || "",
          ]),
        );
        setErrors(formattedErrors);

        toast.error("Validation failed", {
          description: errors.line_id,
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast(`An unexpected error occurred ${error}`);

      return {
        ...prevState,
        error: "An unexpected error occurred",
        status: "ERROR",
      };
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  //const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (item: Item) => {
    //setSelectedItem(item);
    setFormValues({ line: item });
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      handleToggle();
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="flex flex-row gap-4">
      <div className="w-fit relative inline-block text-left" ref={dropdownRef}>
        <>
          <button
            type="button"
            className={cn("hover:bg-gray-50 ", "btn_primary flex items-center")}
            id="options-menu"
            aria-haspopup="true"
            aria-expanded={isOpen}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
          >
            {formValues.line != null ? formValues.line.value : "Select"}
            <ChevronDown className="w-5 h-8 ml-2 " />
          </button>
        </>

        {isOpen && (
          <div className="origin-top-left absolute left-0 mt-1 w-[300px] rounded-md shadow-lg bg-licht_on_surface ring-1 ring-black ring-opacity-5">
            <div
              className="p-2"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {factories.map((factory) => (
                <div key={factory.id}>
                  <h3 className="t block px-4 py-1 text-base font-semibold text-[#58A6FF]">
                    {factory.name}
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {factory.lines.map((line) => (
                      <button
                        key={line.id}
                        onClick={() => {
                          handleSelect({ key: line.id, value: line.name });
                        }}
                        className={cn(
                          "block w-full h-8  bg-blue-900 font-medium text-neutral-100 font-roboto rounded-lg",
                          "focus:outline-none",
                          "focus:ring-2 focus:ring-offset-2 focus:ring-offset-licht_on_surface focus:ring-primary",
                        )}
                      >
                        {line.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <input
          type="hidden"
          name="line_id"
          value={formValues.line?.key || ""}
          required
        />
      </div>

      <button
        type="submit"
        className="btn_primary flex justify-between items-center w-[90px] "
        disabled={isPending}
      >
        <p className="text-blue-600">{isPending ? "Creating..." : "Create"}</p>
        <Send className="w-5 h-8 text-blue-600" />
      </button>
    </form>
  );
};

export default CreateLayoutForm;
