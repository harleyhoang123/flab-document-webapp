export class Response<T> {
  status?: {
    status?: number;
    code?: string;
    responseDate?: string;
  };
  data?: T;
}
