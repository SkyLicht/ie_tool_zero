import { LineModelShort } from "@/features/types/line-model";

export type FactoryModel = {
  id: string;
  name: string;
};

export type FactoryLinesModel = {
  id: string;
  name: string;
  lines: LineModelShort[];
};
