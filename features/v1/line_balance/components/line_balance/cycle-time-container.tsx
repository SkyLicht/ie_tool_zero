"use client";
import React, { useMemo, useState } from "react";
import { RecordQuery } from "@/features/types/line-balance";
import { CycleTimeTimer } from "@/features/v1/line_balance/components/form/timer";
import { PlusIcon } from "lucide-react";
import { SaveRecordForm } from "@/features/v1/line_balance/components/form/save-record-form";

type Props = {
  record: RecordQuery;
};
const CycleTimeContainer = ({ record }: Props) => {
  const [open, setOpen] = useState(false);
  const [cycleTime, setCycleTime] = useState<number[]>(record.cycle_times);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [canSave, setCanSave] = useState<boolean>(false);

  const ct = useMemo(() => {
    const _cycle_time = cycleTime.reduce((acc, current) => acc + current, 0);
    return _cycle_time == 0 ? 0 : _cycle_time / cycleTime.length / 1000;
  }, [cycleTime]);
  const addCycleTime = () => {
    setCycleTime([...cycleTime, 0]);
  };

  const handleCycleTimeChange = (value: number) => {
    const newCycleTime = [...cycleTime];
    newCycleTime[selectedIndex] = value;
    setCycleTime(newCycleTime);
  };

  const handleOnRemoveCycleByIndex = () => {
    if (selectedIndex === 0) {
      return;
    }
    const newCycleTime = [...cycleTime];
    newCycleTime.splice(selectedIndex, 1);
    setCycleTime(newCycleTime);
    setSelectedIndex(-1);

    setOpen(false);
  };
  return (
    <li className="h-full w-full flex flex-col container ">
      <CycleTimeTimer
        cycle_time={cycleTime[selectedIndex]}
        open={open}
        onUpdateCycle={(time) => {
          handleCycleTimeChange(time);
          setCanSave(true);
        }}
        setOpen={setOpen}
        onRemove={handleOnRemoveCycleByIndex}
        selectedIndex={selectedIndex}
      />
      <div className="h-[35px]  flex items-center justify-between">
        <div className="flex flex-row gap-2  card_title">
          <span>{record.area.name}</span>
          <span>{record.station.operation_name}</span>
        </div>
        {canSave && (
          <SaveRecordForm
            record_id={record.id}
            cycle_times={cycleTime}
            onSuccess={() => {
              setCanSave(false);
            }}
          />
        )}
      </div>
      <div className="w-full h-[50px]   flex flex-row justify-between gap-2 ">
        <button
          className="flex justify-center items-center h-full w-[40px] "
          onClick={addCycleTime}
        >
          <PlusIcon />
        </button>
        <div className="w-full flex flex-row   gap-2  scroll-blue overflow-x-auto">
          {cycleTime.map((cycle_time, index) => (
            <button
              type="button"
              key={`cycle-time-${record.id}-${index}`}
              className="h-[40px] w-[75px] min-w-[75px] flex cursor-pointer items-center justify-center font-semibold text-xl rounded-md card-container"
              onClick={() => {
                setSelectedIndex(index);
                setOpen(true);
              }}
            >
              {(cycle_time / 1000).toFixed(2)}
            </button>
          ))}
        </div>

        <div className="h-[50px] flex items-center">
          <h3 className="font-semibold text-2xl">{ct.toFixed(2)}s</h3>
        </div>
      </div>
    </li>
  );
};

export default CycleTimeContainer;
