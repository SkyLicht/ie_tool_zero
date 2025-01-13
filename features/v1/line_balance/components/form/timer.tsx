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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { round } from "@floating-ui/utils";

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

  const handleGkgChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      gkg_cycle_time: { value: string };
      gkg_clean_cycle: { value: string };
    };

    if (Number(target.gkg_cycle_time.value) <= 0) {
      return;
    }

    if (Number(target.gkg_clean_cycle.value) <= 0) {
      return;
    }

    onUpdateCycle(
      Number(target.gkg_cycle_time.value) * 1000 +
        Number(target.gkg_clean_cycle.value) * 1000,
    );

    setOpen(false);
  };

  const handleTestChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      "test-fix": { value: string };
    };

    if (Number(target["test-fix"].value) <= 0) {
      return;
    }

    if (time <= 0) {
      return;
    }

    onUpdateCycle(round(time / Number(target["test-fix"].value)));

    setOpen(false);
  };

  const handleHellerChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      "heller-size": { value: string };
      "heller-cm": { value: string };
    };

    if (Number(target["heller-size"].value) <= 0) {
      return;
    }

    if (Number(target["heller-cm"].value) <= 0) {
      return;
    }

    const result =
      60 /
      (Number(target["heller-cm"].value) /
        (Number(target["heller-size"].value) + 5));

    onUpdateCycle(round(result * 1000));

    setOpen(false);
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
        className="sm:max-w-[425px] container"
        aria-description="ddd"
      >
        <DialogHeader className="">
          <DialogTitle className="card_title">Timer</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 ">
          <Tabs
            defaultValue="timer"
            className="w-[400px] h-[150px] bg-transparent"
          >
            <TabsList className="bg-transparent">
              <TabsTrigger
                value="timer"
                className="data-[state=active]:bg-licht_interactive data-[state=active]:text-primary-foreground  data-[state=active]:shadow"
              >
                Timer
              </TabsTrigger>
              <TabsTrigger
                value="gkg"
                className="data-[state=active]:bg-licht_interactive data-[state=active]:text-primary-foreground  data-[state=active]:shadow"
              >
                GKG
              </TabsTrigger>
              <TabsTrigger
                value="heller"
                className="data-[state=active]:bg-licht_interactive data-[state=active]:text-primary-foreground  data-[state=active]:shadow"
              >
                Heller
              </TabsTrigger>
              <TabsTrigger
                value="test"
                className="data-[state=active]:bg-licht_interactive data-[state=active]:text-primary-foreground  data-[state=active]:shadow"
              >
                Test
              </TabsTrigger>
            </TabsList>
            <TabsContent value="timer" className="flex flex-col gap-4">
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
            </TabsContent>

            <TabsContent value="gkg">
              <form
                onSubmit={handleGkgChange}
                className="w-full h-full flex flex-row justify-center items-center font-semibold gap-6"
              >
                <div className="flex flex-col items-center ">
                  <h3>Cycle Time</h3>
                  <input
                    name="gkg_cycle_time"
                    type="number"
                    step="0.1"
                    className="w-[100px] text-xl font-semibold bg-transparent border border-white rounded-md p-1"
                  />
                </div>

                <div className="flex flex-col items-center">
                  <h3>Clean Cycle</h3>
                  <input
                    name="gkg_clean_cycle"
                    type="number"
                    step="0.1"
                    className="w-[100px] text-xl font-semibold bg-transparent border border-white rounded-md p-1"
                  />
                </div>

                <button
                  type="submit"
                  className="btn_primary flex justify-between items-center w-fit"
                >
                  <p>Ok</p>
                </button>
              </form>
            </TabsContent>
            <TabsContent value="heller">
              <form
                onSubmit={handleHellerChange}
                className="w-full h-full flex flex-row justify-center items-center font-semibold gap-2"
              >
                <div className="flex flex-col items-center">
                  <label>size</label>
                  <input
                    name="heller-size"
                    type="number"
                    step="0.1"
                    className="w-[80px] text-xl font-semibold bg-transparent border border-white rounded-md p-1"
                  />
                </div>

                <div className="flex flex-col items-center">
                  <label>speed</label>
                  <input
                    name="heller-cm"
                    type="number"
                    step="0.1"
                    className="w-[80px] text-xl font-semibold bg-transparent border border-white rounded-md p-1"
                  />
                </div>

                <button
                  type="submit"
                  className="btn_primary flex justify-between items-center w-fit"
                >
                  <p>Ok</p>
                </button>
              </form>
            </TabsContent>
            <TabsContent value="test">
              <form
                onSubmit={handleTestChange}
                className="w-full h-full flex flex-row justify-center items-center font-semibold gap-2"
              >
                <div className=" text-center">
                  <span className="text-4xl font-bold font-mono">
                    {formatTime(time)}
                  </span>
                </div>
                <span className="text-4xl font-bold font-mono">/</span>
                <div className="flex flex-col items-center">
                  <input
                    name="test-fix"
                    type="number"
                    step="0.1"
                    className="w-[80px] text-xl font-semibold bg-transparent border border-white rounded-md p-1"
                  />
                </div>

                <button
                  type="submit"
                  className="btn_primary flex justify-between items-center w-fit"
                >
                  <p>Ok</p>
                </button>
              </form>
            </TabsContent>
          </Tabs>

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
