import { StationsModel } from "@/features/types/stations-model";

export type LayoutModel = {
  id: string;
  is_active: boolean;
  line_id: string;
  line_name: string;
  factory_id: string;
  factory: string;

  stations: StationsModel[];
};

export type LayoutModelShort = {
  id: string;
  line_id: string;
  line_name: string;
  factory_id: string;
  factory: string;
};
