import { z } from "zod";

export const workPlanSchema = z.object({
  platform_id: z.string().min(15),
  planned_hours: z.number().min(1).max(24),
  target_oee: z.number().min(0).max(1),
  uph_i: z.number().min(1),
  head_count: z.number().min(1),
  ft: z.number().min(1),
  ict: z.number().min(1),
});
