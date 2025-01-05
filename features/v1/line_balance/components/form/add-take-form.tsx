"use client";
import React, { useActionState } from "react";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { createTake } from "@/features/v1/line_balance/actions/action_create-take";
import { useRouter } from "next/navigation";

const AddTakeForm = ({ line_balance_id }: { line_balance_id: string }) => {
  const router = useRouter();
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const result = await createTake(prevState, line_balance_id);
      if (result.status == "SUCCESS") {
        // reloader
        // redirect to the same page
        router.push(`?selected_take=${result.data.id}`);
        toast("Take created successfully");
        return result;
      }
      if (result.status == "ERROR") {
        toast.error("An unexpected error occurred", {
          description: result.error,
        });
      }
      return result;
    } catch (error) {
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
    <div className="w-fit border-white border p-2">
      <form action={formAction}>
        <button
          type="submit"
          className="flex items-center justify-center"
          disabled={isPending}
        >
          <PlusCircle size={36} />
        </button>
      </form>
    </div>
  );
};

export default AddTakeForm;
