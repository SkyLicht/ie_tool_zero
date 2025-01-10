import React, { useActionState } from "react";
import { toast } from "sonner";
import { updateCycleTime } from "@/features/v1/line_balance/actions/action-update-cycle-time";

import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";

type Props = {
  cycle_times: number[];
  record_id: string;
  onSuccess: () => void;
};
export function SaveRecordForm({ cycle_times, record_id, onSuccess }: Props) {
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      formData.append("record_id", record_id);
      formData.append("cycle_times", JSON.stringify(cycle_times));

      const result = await updateCycleTime(prevState, formData);
      if (result.status == "SUCCESS") {
        toast("Record updated successfully");
        onSuccess();
        return result;
      }
      if (result.status == "ERROR") {
        toast.error(result.error, {
          description: result.error_massage,
        });
      }
      return result;
    } catch (error) {
      toast(`An unexpected error occurred `);
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
    <form action={formAction} className="">
      <button
        type="submit"
        disabled={isPending}
        className="flex flex-row items-center btn_action-save"
      >
        {isPending ? "Saving..." : <SaveIcon />}
      </button>
    </form>
  );
}
