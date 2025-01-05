"use client";
import React, { useActionState } from "react";
import { PlusIcon, SaveIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FactoryLinesModel } from "@/features/types/factory-model";
import { LineModelShort } from "@/features/types/line-model";
import Form from "next/form";
import { createLineBalance } from "@/features/v1/line_balance/actions/action-create-line_balance";
import { toast } from "sonner";

// todo: move to linne balance component folder
type Props = {
  data: FactoryLinesModel[];
};
const ActionLinesForm = ({ data }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [selectedLine, setSelectedLine] = React.useState<LineModelShort | null>(
    null,
  );
  const handleFormSubmit = async (prevState: any) => {
    try {
      if (!selectedLine) {
        return {
          ...prevState,
          error: "Please select a line",
          status: "ERROR",
        };
      }
      const result = await createLineBalance(prevState, selectedLine.id);

      if (result.status == "SUCCESS") {
        toast.success("Line balance record created successfully");
      }

      if (result.status == "ERROR") {
        toast.error(result.error, {
          description: result.error_massage.detail,
        });
      }

      return result;
    } catch (error) {
      console.log(`An unexpected error occurred ${error}`);

      return {
        ...prevState,
        error: "An unexpected error occurred",
        status: "ERROR",
      };
    }
  };
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="btn_action">
          <PlusIcon />
        </button>
      </PopoverTrigger>
      <PopoverContent className="bg-transparent p-0  card-container">
        <section className="flex flex-col gap-4 items-end">
          <ul className="w-full flex flex-col  gap-2 ">
            {data.map((factory) => (
              <li key={factory.id} className="flex flex-col  ">
                <h3 className="text-heading">{factory.name}</h3>
                <ul className="grid grid-cols-4 gap-2">
                  {factory.lines.map((line) => (
                    <button
                      key={line.id}
                      onClick={() => {
                        setSelectedLine(line);
                      }}
                      className="btn_secondary-surface"
                    >
                      <h4>{line.name}</h4>
                    </button>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <Form action={formAction}>
            {selectedLine && (
              <button
                type="submit"
                className="btn_primary flex justify-between items-center w-fit"
                disabled={isPending}
              >
                {isPending ? (
                  "Creating..."
                ) : (
                  <>
                    <SaveIcon size={20} className="text-blue-600 mr-1" />
                    <div className="flex flex-row gap-1">
                      <p>Create</p>
                      <span className="text-blue-600 font-semibold">
                        Cycle time
                      </span>
                      <p>for {selectedLine.name}</p>
                    </div>
                  </>
                )}
              </button>
            )}
          </Form>
        </section>
      </PopoverContent>
    </Popover>
  );
};

export default ActionLinesForm;
