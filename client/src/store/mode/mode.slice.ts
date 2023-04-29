import { createSlice } from "@reduxjs/toolkit";
import { IInitialState, ModeType } from "./mode.type";

const initialState: IInitialState = {
  mode: "light",
};

export const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    changeMode(state) {
      state.mode = state.mode === "dark" ? "light" : "dark";

      // const body = document.querySelector("body");
      // state.mode === "dark"
      //   ? body?.classList.add("dark")
      //   : body?.classList.remove("dark");
      // localStorage.setItem("mode", JSON.stringify(state.mode));
    },
  },
});
