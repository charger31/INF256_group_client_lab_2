export type METHOD = "GET" | "POST";

export interface Options extends RequestInit {
  method: METHOD;
  body: BodyInit | null;
  headers?: HeadersInit;
}

interface DefaultPayload<T> {
  status: string;
  data: T;
}

interface RegisterData {
  name: string;
}

interface LoginData {
  token: string;
  user: RegisterData;
}


export type RegisterPayload = DefaultPayload<RegisterData>;

export type LoginPayload = DefaultPayload<LoginData>;