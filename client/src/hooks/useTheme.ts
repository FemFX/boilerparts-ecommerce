import { useActions } from "./useActions";
import { useTypedSelector } from "./useTypedSelector";

export const useTheme = () => {
  const { mode } = useTypedSelector((state) => state.mode);
  const { changeMode } = useActions();

  return {
    theme: mode,
    changeTheme: changeMode,
  };
};
