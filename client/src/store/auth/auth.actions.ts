import { instance } from "@/utils/axiosClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  IFullUser,
  ILoginRequest,
  ILoginResponse,
  ISignUpRequest,
  IUser,
} from "./auth.type";

export const signUp = createAsyncThunk<IFullUser, ISignUpRequest>(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      const { data: dataResponse } = await instance.post("/users/signup", data);
      if (dataResponse.warningMessage) {
        toast.warning(dataResponse.warningMessage);
        return;
      }

      toast.success("Регистрация прошла успешно!");

      return dataResponse;
    } catch (err) {
      toast.warning("error");
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const login = createAsyncThunk<ILoginResponse, ILoginRequest>(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const { data: dataResponse } = await instance.post("/users/login", data);
      if (dataResponse.warningMessage) {
        toast.warning(dataResponse.warningMessage);
        return;
      }

      toast.success("Авторизация прошла успешно!");

      return dataResponse;
    } catch (err) {
      toast.warning("error");
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await instance.get("/users/logout");
  } catch (err) {
    toast.warning("error");
    return thunkAPI.rejectWithValue(err);
  }
});
