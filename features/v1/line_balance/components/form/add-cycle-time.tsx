"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTimer } from "@/features/v1/hooks/useTimer";

type Props = {
  cycle_time: number;
};
export function CycleTimeTimer({ cycle_time }: Props) {
  const [open, setOpen] = useState(false);
  const { time, isRunning, isPaused, start, stop, pause, resume, restart } =
    useTimer(cycle_time);
  const [isSaving, setIsSaving] = useState(false);
  const [cycleTime, setCycleTime] = useState(cycle_time);
  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = milliseconds % 1000;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`;
  };

  const handleOnSave = async () => {
    setIsSaving(true);
    try {
      alert("Timer data saved successfully!");
    } catch (error) {
      console.error("Error saving timer data:", error);
      alert("Failed to save timer data. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-[60px] h-[50px] ">{cycleTime.toFixed(2)}</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-description="ddd">
        <DialogHeader>
          <DialogTitle>Timer</DialogTitle>
          <DialogDescription>Fixed the warning</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="text-center">
            <span className="text-4xl font-bold font-mono">
              {formatTime(time)}
            </span>
          </div>
          <div className="flex justify-center space-x-2">
            {!isRunning && !isPaused && (
              <Button type="button" onClick={start}>
                Start
              </Button>
            )}
            {isRunning && !isPaused && (
              <>
                <Button
                  type="button"
                  onClick={() => {
                    setCycleTime(time / 1000);
                    pause();
                  }}
                >
                  Pause
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setCycleTime(time / 1000);
                    stop();
                  }}
                >
                  Stop
                </Button>
              </>
            )}
            {isPaused && (
              <>
                <Button
                  type="button"
                  onClick={() => {
                    setCycleTime(time / 1000);
                    resume();
                  }}
                >
                  Resume
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setCycleTime(time / 1000);
                    stop();
                  }}
                >
                  Stop
                </Button>
              </>
            )}
            <Button
              type="button"
              onClick={() => {
                setCycleTime(time / 1000);
                restart();
              }}
            >
              Restart
            </Button>
          </div>
          {!isRunning && !isPaused && time > 0 && (
            <div className="flex justify-center">
              <Button type="button" onClick={handleOnSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
