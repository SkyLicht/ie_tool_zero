"use client";
import React, { useActionState } from "react";
import AlertDialog from "@/components/alerts/alert-dialog";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { serverActionResponse } from "@/lib/licht-actions";
import { useRouter } from "next/navigation";

function DeleteForm<T>({
  id,
  promise,
  params,
}: {
  id: string;
  promise: (state: any, take_id: string) => Promise<serverActionResponse<T>>;
  params: {
    title: string;
    replace?: string;
  };
}) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const handleFormSubmit = async (
    prevState: serverActionResponse<T>,
    formData: FormData,
  ) => {
    try {
      formData.append("id", "1");
      console.log(prevState);
      const result = await promise(prevState, id);
      if (result.status == "SUCCESS") {
        if (params.replace) {
          router.push(params.replace);
        }
        setOpen(false);

        toast("Take deleted successfully");
        return result;
      }
      if (result.status == "ERROR") {
        toast.error("An unexpected error occurred", {
          description: result.error,
        });
      }
      setOpen(false);
      return result;
    } catch (error) {
      setOpen(false);
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
    <AlertDialog
      open={open}
      setOpen={setOpen}
      description={
        <div className="w-full text-center">
          <h3>
            Are you sure you want to delete this{" "}
            <span className="text-red-500 px-1">
              {id} {params.title.toLowerCase()}
            </span>
            ? This action cannot be undone.
          </h3>
        </div>
      }
      title={`Delete ${params.title}`}
      trigger={
        <button className="btn_action-delete">
          <Trash />
        </button>
      }
    >
      <div className="flex items-center justify-center gap-4">
        <button
          className="btn_action"
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </button>
        <form action={formAction}>
          <button
            type="submit"
            disabled={isPending}
            className="btn_action-delete"
          >
            <Trash />
          </button>
        </form>
      </div>
    </AlertDialog>
  );
}

export default DeleteForm;
