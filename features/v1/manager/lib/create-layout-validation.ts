import { z } from "zod";

export const createLayoutValidation = z.object({
  line_id: z.string().min(15, {
    message: "Please select a line",
  }),
});
