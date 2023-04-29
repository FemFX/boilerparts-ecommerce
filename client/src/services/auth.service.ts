import { HTTPStatus } from "@/constants";
import { instance } from "@/utils/axiosClient";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const checkUserAuth = async () => {
  try {
    const { data } = await instance.get("/users/login-check");

    return data;
  } catch (err) {
    const axiosError = err as AxiosError;

    if (axiosError.response) {
      if (axiosError.response.status === HTTPStatus.FORBIDDEN) {
        return false;
      }
    }

    toast.error((err as Error).message);
  }
};
