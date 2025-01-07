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

export type StationQuery = {
  index: number;
  operation_id: string;
  layout_id: string;
  id: string;
  area_id: string;
  machine_id: null;
  operation: {
    name: string;
    label: string;
    is_automatic: true;
    description: string;
    id: string;
  };
  area: {
    index: number;
    name: string;
    id: string;
    section: string;
  };
};

export type StationShortQuery = {
  id: string;
  layout_id: string;
  index: number;
  operation_id: string;
  operation_name: string;
  is_automatic: boolean;
  area_id: string;
  area_name: string;
  area_section: string;
};
