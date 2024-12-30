import { OperationModel } from "@/features/types/operation-model";

export type CreateStationsModel = {
  index: number;
  operation: OperationModel;
  area_id: string;
  layout_id: string;
};

export type StationsModel = {
  id: string;
  index: number;
  operation_id: string;
  station_cluster_id: null;
  layout_id: string;
  area_id: string;
  machine_id: null;
};
