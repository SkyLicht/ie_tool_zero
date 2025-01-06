"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTimer } from "@/features/v1/hooks/useTimer";
import { SaveIcon } from "lucide-react";

type Props = {
  cycle_time: number;
  setCycleTime: (cycle_time: number) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};
export function CycleTimeTimer({
  cycle_time,
  setCycleTime,
  setOpen,
  open,
}: Props) {
  const { time, isRunning, isPaused, start, stop, pause, resume, restart } =
    useTimer(cycle_time);
  const [isSaving, setIsSaving] = useState(false);
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
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          stop();
          restart();
        }
        setOpen(value);
      }}
    >
      {/*<DialogTrigger asChild>*/}
      {/*  <button className="w-[60px] h-[50px] ">{cycleTime.toFixed(2)}</button>*/}
      {/*</DialogTrigger>*/}
      <DialogContent
        className="sm:max-w-[425px] h-[250px] container"
        aria-description="ddd"
      >
        <DialogHeader>
          <DialogTitle className="card_title">Timer</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form className="grid grid-rows-3 p-2 ">
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
                  setCycleTime(time);
                }}
                type="button"
              >
                Stop
              </Button>
            )}

            <Button
              onClick={() => {
                restart();
                setCycleTime(0);
              }}
              type="button"
              disabled={!isPaused}
            >
              Reset
            </Button>
          </div>

          <div className="flex justify-end items-center ">
            <Button type="button" onClick={handleOnSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
              <SaveIcon />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

{
  /*<div className="grid grid-cols-3 space-x-2">*/
}
{
  /*  {!isRunning && !isPaused && (*/
}
{
  /*    <Button type="button" onClick={start}>*/
}
{
  /*      Play*/
}
{
  /*      <Play />*/
}
{
  /*    </Button>*/
}
{
  /*  )}*/
}
{
  /*  <Button*/
}
{
  /*    type="button"*/
}
{
  /*    onClick={() => {*/
}
{
  /*      setCycleTime(time);*/
}
{
  /*      restart();*/
}
{
  /*    }}*/
}
{
  /*  >*/
}
{
  /*    Restart*/
}
{
  /*    <RefreshCcw />*/
}
{
  /*  </Button>*/
}
{
  /*  {isRunning && !isPaused && (*/
}
{
  /*    <>*/
}
{
  /*      <Button*/
}
{
  /*        type="button"*/
}
{
  /*        onClick={() => {*/
}
{
  /*          setCycleTime(time);*/
}
{
  /*          pause();*/
}
{
  /*        }}*/
}
{
  /*      >*/
}
{
  /*        Pause*/
}
{
  /*        <Pause />*/
}
{
  /*      </Button>*/
}
{
  /*      /!*<Button*!/*/
}
{
  /*      /!*  type="button"*!/*/
}
{
  /*      /!*  onClick={() => {*!/*/
}
{
  /*      /!*    setCycleTime(time);*!/*/
}
{
  /*      /!*    stop();*!/*/
}
{
  /*      /!*  }}*!/*/
}
{
  /*      /!*>*!/*/
}
{
  /*      /!*  Stop*!/*/
}
{
  /*      /!*  <StopCircle />*!/*/
}
{
  /*      /!*</Button>*!/*/
}
{
  /*    </>*/
}
{
  /*  )}*/
}
{
  /*  {isPaused && (*/
}
{
  /*    <>*/
}
{
  /*      <Button*/
}
{
  /*        type="button"*/
}
{
  /*        onClick={() => {*/
}
{
  /*          setCycleTime(time);*/
}
{
  /*          resume();*/
}
{
  /*        }}*/
}
{
  /*      >*/
}
{
  /*        Play*/
}
{
  /*        <Play />*/
}
{
  /*      </Button>*/
}
{
  /*      <Button*/
}
{
  /*        type="button"*/
}
{
  /*        onClick={() => {*/
}
{
  /*          setCycleTime(time);*/
}
{
  /*          stop();*/
}
{
  /*        }}*/
}
{
  /*      >*/
}
{
  /*        Stop*/
}
{
  /*        <StopCircle />*/
}
{
  /*      </Button>*/
}
{
  /*    </>*/
}
{
  /*  )}*/
}
{
  /*</div>*/
}
