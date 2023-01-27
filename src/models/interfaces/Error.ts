export interface validationError {
  location: string;
  msg: string;
  param: string;
  value: string;
}
export interface SimpleError {
  error: {
    data: Record<string, any>;
    status: number;
  };
}
