export interface IInitialState {
  user: IUser | undefined | null;
  isLoading: boolean;
  error: any;
}
export interface ISignUpRequest {
  email: string;
  username: string;
  password: string;
}
export interface ILoginRequest {
  username: string;
  password: string;
}
export interface IUser {
  userId: number;
  username: string;
  password: string;
}
export interface IFullUser {
  id: number;
  username: string;
  password: string;
  email: string;
  updatedAt: string;
  createdAt: string;
}
export interface ILoginResponse {
  user: {
    userId: number;
    username: string;
    password: string;
  };
  msg: string;
}
