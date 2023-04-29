import { createSlice } from "@reduxjs/toolkit";
import { IInitialState } from "./cart.type";

const initialState: IInitialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {},
});
