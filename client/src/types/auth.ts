import { UseFormRegister, FieldErrors } from "react-hook-form";

export interface IInputs {
  username: string;
  email: string;
  password: string;
}
export interface IAuthPageInput {
  register: UseFormRegister<IInputs>;
  errors: FieldErrors<IInputs>;
}
