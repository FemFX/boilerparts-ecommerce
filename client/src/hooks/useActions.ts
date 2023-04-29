import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import * as authActions from "@/store/auth/auth.actions";
import { modeSlice } from "@/store/mode/mode.slice";
import { authSlice } from "@/store/auth/auth.slice";

const allActions = {
  ...authActions,
  ...modeSlice.actions,
  ...authSlice.actions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch]);
};
