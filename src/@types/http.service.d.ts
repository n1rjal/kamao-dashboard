declare module HttpRequest {
  interface ParamsInterface {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    headers?: any;
    tokenProtected: boolean;
    multipartForm?: boolean;
  }
  interface HeaderInterface {
    Authorization?: string;
    "Content-Type"?: string;
  }
}
