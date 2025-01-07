export interface serverActionResponse<T> {
  status: string;
  error?: string;
  error_massage?: string;
  data?: T;
}
