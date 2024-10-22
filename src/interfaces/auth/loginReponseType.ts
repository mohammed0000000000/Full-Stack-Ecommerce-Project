
interface IUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface ILoginResponseFulfilled {
  jwt: string;
  user: IUser;
}

export interface IError {
  status: number;
  name: string;
  message: string;
  details?: undefined;
}

export interface ILoginResponseRejected {
  data: string | null;
  error: IError | null;
}


