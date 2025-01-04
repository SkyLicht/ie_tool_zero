"use client";
import React, { useEffect, useRef } from "react";
import { AreaModel } from "@/features/types/area-model";
import { OperationModel } from "@/features/types/operation-model";
import { CreateStationsModel } from "@/features/types/stations-model";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronLeftIcon,
  ChevronRight,
  ChevronUp,
  SaveIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { getSession } from "next-auth/react";
import { UPDATE_LAYOUT } from "@/lib/queries";
import { LayoutModel } from "@/features/types/layout-model";

type Props = {
  layout_id: string;
  areas: AreaModel[];
  operations: OperationModel[];
  layout: LayoutModel;
};

const LayoutContainer = ({ layout_id, areas, operations, layout }: Props) => {
  const [_operation, setOperation] =
    React.useState<OperationModel[]>(operations);

  const [_stations, setStations] = React.useState<CreateStationsModel[]>(
    layout.stations.map((record) => {
      return {
        index: record.index,
        operation: operations.find(
          (op) => op.id === record.operation_id,
        ) as OperationModel,
        area_id: record.area_id,
        layout_id: layout_id,
      };
    }),
  );

  const handleOperationToStations = (operation: OperationModel) => {
    const station: CreateStationsModel = {
      index: _stations.length,
      operation: operation,
      area_id: "",
      layout_id: layout_id,
    };

    setStations([..._stations, station]);

    // Remove operation from list
    setOperation(_operation.filter((op) => op.id !== operation.id));
  };

  const handleStationToOperation = (station: CreateStationsModel) => {
    setStations(
      _stations.filter((s) => s.operation.id !== station.operation.id),
    );

    // Update indexes
    const updatedStations = _stations
      .filter((s) => s.operation.id !== station.operation.id)
      .map((s, index) => ({ ...s, index }));

    setStations(updatedStations);

    // Add operation back to list
    setOperation([..._operation, station.operation]);
  };

  const handleUpdateIndex = (index: number, direction: "up" | "down") => {
    const isMoveUp = direction === "up";
    const isMoveDown = direction === "down";

    // Boundary checks
    if (
      (isMoveUp && index === 0) ||
      (isMoveDown && index === _stations.length - 1)
    ) {
      return;
    }

    // Clone the stations
    const updatedStations = [..._stations];

    // Swap indexes
    const swapIndex = isMoveUp ? index - 1 : index + 1;
    [updatedStations[index].index, updatedStations[swapIndex].index] = [
      updatedStations[swapIndex].index,
      updatedStations[index].index,
    ];

    // Sort stations by index
    updatedStations.sort((a, b) => a.index - b.index);

    // Update state
    setStations(updatedStations);
  };
  const handleOnSave = async () => {
    if (_stations.length == 0) {
      toast.error("No stations to save");
      return;
    }

    if (_stations.some((station) => !station.area_id)) {
      toast.error("Some stations are missing area");
      return;
    }

    try {
      const session = await getSession();
      if (!session?.user.token) {
        toast.error("Not signed in");
        return;
      }

      const responds = await fetch(UPDATE_LAYOUT, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          layout_id: layout_id,
          stations: _stations.map((station) => ({
            index: station.index,
            operation_id: station.operation.id,
            area_id: station.area_id,
          })),
        }),
      });

      if (responds.status === 401) {
        toast.error("Not signed in");
        return;
      }

      if (!responds.ok) {
        throw new Error(`Error saving stations: ${responds.statusText}`);
      }

      toast.success("Stations saved successfully");
    } catch (err: Error | unknown) {
      toast.error("An unexpected error occurred", {
        description:
          err instanceof Error ? err.message : "An unknown error occurred",
      });
    }

    return;
  };

  return (
    <div className=" h-full w-full flex flex-row gap-8  p-2">
      <StationsContainer
        stations={_stations}
        areas={areas}
        onUpdateIndexDown={(index: number) => handleUpdateIndex(index, "down")}
        onUpdateIndexUp={(index: number) => handleUpdateIndex(index, "up")}
        onReturnToOperation={handleStationToOperation}
        onSave={handleOnSave}
      />

      <OperationsContainer
        operations={_operation.filter(
          (op) => !_stations.some((s) => s.operation.id === op.id),
        )}
        onOperationClick={handleOperationToStations}
      />
    </div>
  );
};

export default LayoutContainer;

const StationsContainer = ({
  stations,
  areas,
  onUpdateIndexUp,
  onUpdateIndexDown,
  onReturnToOperation,
  onSave,
}: {
  stations: CreateStationsModel[];
  areas: AreaModel[];
  onUpdateIndexUp: (index: number) => void;
  onUpdateIndexDown: (index: number) => void;
  onReturnToOperation: (station: CreateStationsModel) => void;
  onSave: () => void;
}) => {
  return (
    <div className="h-full  w-fit  flex flex-col  gap-2  ">
      <div className="w-full flex flex-row items-center justify-between px-4">
        <h2 className="card_text_heading">Stations</h2>
        <form action={onSave} className="flex flex-row gap-2">
          <Button size="icon" type="submit">
            <SaveIcon />
          </Button>
        </form>
      </div>
      <div className="w-[600px]  h-fit flex flex-col overflow-y-auto blue-scroll  pr-2 container">
        <ul className="h-fit w-full  flex-vertical gap-2  ">
          {stations.map((station, index) => (
            <li
              key={`station-${station.operation.id}-${index}`}
              className="w-full flex flex-row justify-between gap-2 bg-licht_secondary p-2 rounded-md select-none "
            >
              <div className="flex flex-row gap-4 items-center ">
                <h3 className="font-roboto font-medium text-neutral-200">
                  {station.index + 1}
                </h3>
                <h3 className="font-roboto font-medium text-neutral-200">
                  {station.operation.label}
                </h3>

                <DropDownList
                  value={{
                    id: station.area_id,
                    label:
                      areas.find((area) => area.id === station.area_id)?.name ||
                      "",
                  }}
                  items={areas.map((area) => ({
                    id: area.id,
                    label: area.name,
                  }))}
                  onSelect={(area_id) => {
                    station.area_id = area_id;
                  }}
                />
              </div>

              <div className="flex flex-row gap-4 ">
                {station.index > 0 ? (
                  <button
                    className={cn(
                      "flex flex-1 items-center justify-center text-blue-600",
                      "btn_ghost_command",
                    )}
                    onClick={() => onUpdateIndexUp(station.index)}
                  >
                    <ChevronUp />
                  </button>
                ) : null}

                {station.index < stations.length - 1 ? (
                  <button
                    className={cn(
                      "flex flex-1 items-center justify-center text-blue-600",
                      "btn_ghost_command",
                    )}
                    onClick={() => {
                      onUpdateIndexDown(station.index);
                    }}
                  >
                    <ChevronDown />
                  </button>
                ) : null}

                <button
                  className={cn(
                    "flex flex-1 items-center justify-center text-red-800",
                    "btn_ghost_command",
                  )}
                  onClick={() => {
                    onReturnToOperation(station);
                  }}
                >
                  <ChevronRight />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const DropDownList = ({
  items,
  value,
  onSelect,
}: {
  items: { id: string; label: string }[];
  value: { id: string; label: string } | null;
  onSelect: (area_id: string) => void;
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<{
    id: string;
    label: string;
  } | null>(value);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="inline-block text-left " ref={dropdownRef}>
      <>
        <button
          type="button"
          className={cn(
            "flex flex-row  h-6 bg-blue-800 rounded-full px-3 items-center font-roboto font-medium text-xs text-neutral-100 ",
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedItem?.label ? selectedItem.label : "Select Area"}
        </button>
      </>
      {isOpen ? (
        <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-licht_secondary ring-1 ring-black ring-opacity-5 focus:outline-none border">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {items.map((item, index) => (
              <button
                key={`area-${item.id}-${index}`}
                onClick={() => {
                  onSelect(item.id);
                  setSelectedItem(item);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-neutral-100 hover:bg-licht_on_surface"
                role="menuitem"
              >
                <h3 className="font-medium text-neutral-200"> {item.label}</h3>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const OperationsContainer = ({
  operations,
  onOperationClick,
}: {
  operations: OperationModel[];
  onOperationClick: (operation: OperationModel) => void;
}) => {
  return (
    <div className="h-full  w-fit  flex flex-col  gap-2 container ">
      <div className="w-full flex flex-row items-center justify-between px-4">
        <h2 className="card_text_heading">Operations</h2>
      </div>
      <div className="w-[400px]  flex  overflow-y-auto blue-scroll ">
        <ul className="h-fit w-full flex-vertical gap-2 pr-2  ">
          {operations.map((operation, index) => (
            <li
              key={`operation-${operation.id}-${index}`}
              className="group bg-licht_secondary w-full flex flex-row gap-4 p-2 rounded-md select-none cursor-pointer hover:bg-licht_on_surface active:bg-transparent"
              onClick={() => onOperationClick(operation)}
            >
              <div className=" group-hover:text-blue-600">
                <ChevronLeftIcon />
              </div>
              <h3 className="font-roboto font-medium text-neutral-100">
                {operation.label}
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
