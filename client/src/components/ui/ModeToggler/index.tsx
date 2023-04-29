import { useTheme } from "@/hooks/useTheme";
import React from "react";
import styles from "@/styles/modeToggler/index.module.scss";

const ModeToggler = () => {
  const { theme, changeTheme } = useTheme();
  return (
    <div className={styles.theme}>
      <input
        className={styles.theme__input}
        type="checkbox"
        checked={theme === "light"}
        onChange={() => changeTheme()}
      />
    </div>
  );
};

export default ModeToggler;
