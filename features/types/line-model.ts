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

export type LineWorkDay = {
  description: string | null;
  name: string;
  factory_id: string;
  updated_at: string;
  id: string;
  is_active: boolean;
  created_at: string;
  factory: {
    name: string;
    id: string;
  };
};
