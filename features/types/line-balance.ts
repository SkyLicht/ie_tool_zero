import { LayoutModelShort } from "@/features/types/layout-model";
import { AreaModel } from "@/features/types/area-model";

type WorkPlanQuery = {
  id: string;
  str_date: string;
  week: number;
  platform: {
    id: string;
    platform: string;
    uph: number;
    f_n: number;
    components: number;
    cost: number;
    height: number;
    width: number;
    sku: string;
    in_service: boolean;
  };
  planned_hours: number;
  target_oee: number;
  uph_custom: number;
  uph_target: number;
  commit: number;
  cycle_time: number;
  head_count: number;
  ft: number;
  ict: number;
  start_hour: number;
  end_hour: number;
  created_at: string;
  updated_at: string;
};

type StationQuery = {
  id: string;
  operation_id: string;
  operation_name: string;
  is_automatic: boolean;
};

export type RecordQuery = {
  id: string;
  station_id: string;
  cycle_time: [];
  area: AreaModel;
  station: StationQuery;
};

export type TakeQuery = {
  id: string;
  work_plan: WorkPlanQuery;
  records: RecordQuery[];
  created_at: string;
  updated_at: string;
};

export type TakeModel = {
  id: string;
  user_id: string;
  user_name: string;
  created_at: string;
  updated_at: string;
};

export type LineBalanceQuery = {
  id: string;
  str_date: string;
  week: number;
  layout: LayoutModelShort;
  takes: TakeQuery[];
};
