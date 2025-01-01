import { LineWorkDay } from "@/features/types/line-model";

export type WorkDayModel = {
  str_date: string;
  date: string;
  line_id: string;
  id: string;
  week: number;
  line: LineWorkDay;
};
