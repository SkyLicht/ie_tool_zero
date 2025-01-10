import { LayoutModelShort } from "@/features/types/layout-model";
import { AreaModel } from "@/features/types/area-model";

export type WorkPlanQuery = {
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
  line: {
    id: string;
    name: string;
    factory: string;
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
  cycle_times: [];
  ct: number;
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

export type TakeQueryShort = {
  id: string;
};

export type TakeModel = {
  id: string;
  index: number;
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
  refactored_records: RefactorRecordsQuery[];
  smt_bottleneck: RefactorRecordsQuery;
  packing_bottleneck: RefactorRecordsQuery;
};

export type LineBalanceShirtQuery = {
  id: string;
  str_date: string;
  week: number;
  layout: LayoutModelShort;
  takes: TakeQueryShort[];
};

export type RefactorRecordsQuery = {
  id: string;
  index: number;
  has_updated: boolean;
  base_ct: number;
  all_ct: number[];
  last_ct: number;
  station_id: string;
  area: {
    id: string;
    index: number;
    name: string;
    section: string;
  };
  station: {
    id: string;
    operation_id: string;
    operation_name: string;
    is_automatic: boolean;
  };
};
