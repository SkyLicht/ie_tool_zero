import { FactoryModel } from "@/features/types/factory-model";

export type LineModel = {
  id: string;
  name: string;
  is_active: string;
  description: string;
  factory: FactoryModel;
};

export type LineModelShort = {
  id: string;
  name: string;
  is_active: string;
  description: string;
};
