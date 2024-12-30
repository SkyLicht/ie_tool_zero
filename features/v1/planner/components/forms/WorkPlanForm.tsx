import React, { useActionState, useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { workPlanSchema } from "@/features/v1/planner/lib/planner-validation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useFetchPlatforms } from "@/features/v1/hooks/useFetchPlatforms";
import { cn } from "@/lib/utils";
import { createWorkPlan } from "@/features/v1/planner/actions/work-plan-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const WorkPlanForm = ({
  line_id,
  work_day_id,
  str_date,
  onSuccess,
}: {
  line_id: string;
  work_day_id: string;
  str_date: string;
  onSuccess: () => void;
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { platforms } = useFetchPlatforms();
  const [formValues, setFormValues] = useState({
    platform_id: "",
    planned_hours: "",
    target_oee: "",
    uph_i: "",
    head_count: "",
    ft: "",
    ict: "",
  });

  const router = useRouter();

  // Handle cycle_times changes and update formValues
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      // Extract form data into an object
      const formValues = {
        platform_id: formData.get("platform_id") as string,
        planned_hours: Number(formData.get("planned_hours")),
        target_oee: Number(formData.get("target_oee")),
        uph_i: Number(formData.get("uph_i")),
        head_count: Number(formData.get("head_count")),
        ft: Number(formData.get("ft")),
        ict: Number(formData.get("ict")),
      };

      await workPlanSchema.parseAsync(formValues);

      const result = await createWorkPlan(
        prevState,
        formData,
        line_id,
        work_day_id,
        str_date,
      );

      if (result.status == "SUCCESS") {
        toast("Work plan created successfully");

        // Clear only after successful submission if needed
        setFormValues({
          platform_id: "",
          planned_hours: "",
          target_oee: "",
          uph_i: "",
          head_count: "",
          ft: "",
          ict: "",
        });

        router.refresh();
        onSuccess();

        // router.push(`/startup/${result._id}`);
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

        toast("Validation failed");

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

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <div>
        <label
          htmlFor="platform_id"
          className="block text-sm font-medium text-gray-300"
        >
          Platform
        </label>
        <select
          id="platform_id"
          name="platform_id"
          className={cn(
            "mt-1 block w-full rounded-md bg-gray-800 text-gray-300 border border-gray-700 focus:border-0 focus:ring focus:ring-transparent focus:ring-opacity-0",
            "h-8 p-1",
          )}
          value={formValues.platform_id}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled className="text-gray-500">
            Select a Platform
          </option>
          {platforms.map((platform) => (
            <option key={platform.id} value={platform.id}>
              {platform.platform}
            </option>
          ))}
        </select>
        {errors.platform_id && (
          <p className="mt-2 text-sm text-red-500">{errors.platform_id}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="planned_hours"
          className="block text-sm font-medium text-gray-300"
        >
          Planned Hours
        </label>
        <Input
          id="planned_hours"
          name="planned_hours"
          type={"number"}
          className=""
          value={formValues.planned_hours}
          onChange={handleInputChange}
          required
          placeholder="Planned Hours"
        />

        {errors.planned_hours && (
          <p className="text-red-500">{errors.planned_hours}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="target_oee"
          className="block text-sm font-medium text-gray-300"
        >
          Target OEE
        </label>
        <Input
          id="target_oee"
          name="target_oee"
          type={"number"}
          className=""
          value={formValues.target_oee}
          onChange={handleInputChange}
          required
          placeholder="Target OEE"
        />

        {errors.target_oee && (
          <p className="text-red-500">{errors.target_oee}</p>
        )}
      </div>

      <div className="flex flex-row gap-4">
        <div>
          <label
            htmlFor="uph_i"
            className="block text-sm font-medium text-gray-300"
          >
            UPH
          </label>
          <Input
            id="uph_i"
            name="uph_i"
            type={"number"}
            className=""
            value={formValues.uph_i}
            onChange={handleInputChange}
            required
            placeholder="UPH"
          />

          {errors.uph_i && <p className="text-red-500">{errors.uph_i}</p>}
        </div>

        <div>
          <label
            htmlFor="head_count"
            className="block text-sm font-medium text-gray-300"
          >
            Head Count
          </label>
          <Input
            id="head_count"
            name="head_count"
            type={"number"}
            className=""
            value={formValues.head_count}
            onChange={handleInputChange}
            required
            placeholder="Head Count"
          />

          {errors.head_count && (
            <p className="text-red-500">{errors.head_count}</p>
          )}
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <div>
          <label
            htmlFor="ft"
            className="block text-sm font-medium text-gray-300"
          >
            FT
          </label>
          <Input
            id="ft"
            name="ft"
            type={"number"}
            className=""
            value={formValues.ft}
            onChange={handleInputChange}
            required
            placeholder="FT"
          />

          {errors.ft && <p className="text-red-500">{errors.ft}</p>}
        </div>

        <div>
          <label
            htmlFor="ict"
            className="block text-sm font-medium text-gray-300"
          >
            ICT
          </label>
          <Input
            id="ict"
            name="ict"
            type={"number"}
            className=""
            value={formValues.ict}
            onChange={handleInputChange}
            required
            placeholder="ICT"
          />

          {errors.ict && <p className="text-red-500">{errors.ict}</p>}
        </div>
      </div>

      <Button type="submit" variant="default" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default WorkPlanForm;
