export type RequestRespondsError = {
  message: string;
  code: number;
};

export type RequestResponds<T> = {
  data?: T;
  status?: "SUCCESS" | "ERROR" | "LOADING";
  error?: RequestRespondsError | null;
};
