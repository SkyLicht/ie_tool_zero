"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTimer } from "@/features/v1/hooks/useTimer";
import { Trash } from "lucide-react";

type Props = {
  cycle_time: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedIndex: number;
  onRemove: () => void;
  onUpdateCycle: (cycle_time: number) => void;
};
export function CycleTimeTimer({
  cycle_time,
  onUpdateCycle,
  setOpen,
  open,
  onRemove,
  selectedIndex,
}: Props) {
  const { time, isRunning, isPaused, start, stop, pause, resume, restart } =
    useTimer(cycle_time);
  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = milliseconds % 1000;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`;
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          stop();
          //restart();
        }
        setOpen(value);
      }}
    >
      <DialogContent
        className="sm:max-w-[425px] h-[250px] container"
        aria-description="ddd"
      >
        <DialogHeader>
          <DialogTitle className="card_title">Timer</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid grid-rows-3 p-2 ">
          <div className=" text-center">
            <span className="text-4xl font-bold font-mono">
              {formatTime(time)}
            </span>
          </div>
          <div className="grid grid-cols-2 space-x-2">
            {!isRunning || isPaused ? (
              <Button
                onClick={() => {
                  start();
                }}
                type="button"
              >
                Play
              </Button>
            ) : (
              <Button
                onClick={() => {
                  pause();
                  onUpdateCycle(time);
                }}
                type="button"
              >
                Stop
              </Button>
            )}

            <Button
              onClick={() => {
                restart();
                onUpdateCycle(0);
              }}
              type="button"
              disabled={!isPaused}
            >
              Reset
            </Button>
          </div>

          <div className="flex justify-between items-center ">
            {selectedIndex == 0 ? (
              <div></div>
            ) : (
              <button
                type="button"
                className="btn_action-delete"
                onClick={onRemove}
              >
                <Trash />
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
