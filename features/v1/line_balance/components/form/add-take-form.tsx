"use client";
import React, { useActionState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { createTake } from "@/features/v1/line_balance/actions/action_create-take";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StationShortQuery } from "@/features/types/stations-model";
import { Checkbox } from "@/components/ui/checkbox";

const AddTakeForm = ({
  line_balance_id,
  stations,
}: {
  line_balance_id: string;
  stations: StationShortQuery[];
}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedStations, setSelectedStations] = React.useState<string[]>([]);
  const router = useRouter();
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    if (selectedStations.length === 0) {
      toast("Select at least one station");
      return {
        ...prevState,
        error: "Select at least one station",
        status: "ERROR",
      };
    }

    try {
      formData.append("line_balance_id", line_balance_id);
      const result = await createTake(
        prevState,
        line_balance_id,
        selectedStations,
      );
      if (result.status == "SUCCESS") {
        router.push(`?selected_take=${result.data.id}`);
        setOpen(false);
        setSelectedStations([]);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center btn_action">
          <Plus />
        </button>
      </DialogTrigger>
      <DialogContent className="container">
        <DialogHeader className="flex flex-grow items-center text-center ">
          <DialogTitle className="card_title">Create Take</DialogTitle>
          <DialogDescription>
            Select the stations and create the take
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="flex flex-col gap-2">
          <div className="h-[300px] flex flex-col  scroll-blue overflow-y-auto">
            {stations.map((station) => (
              <div
                key={`check-box-${station.operation_id}`}
                className="flex flex-row gap-3 items-center"
              >
                <Checkbox
                  name={station.operation_id}
                  checked={selectedStations.includes(station.id)}
                  onCheckedChange={(checked) => {
                    setSelectedStations((prev) => {
                      if (checked) {
                        return [...prev, station.id];
                      }
                      return prev.filter((id) => id !== station.id);
                    });
                  }}
                />
                <div className="flex flex-row gap-2 p-1">
                  <h3>{station.area_name}</h3>
                  <h3>{station.operation_name}</h3>
                </div>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="flex items-center justify-center btn_action"
            disabled={isPending}
          >
            <span>Create Take with {selectedStations.length} stations</span>
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTakeForm;
