import { FC } from "react";
import LocationSvg from "../LocationSvg";
import styles from "@/styles/cityButton/index.module.scss";
import { useTheme } from "@/hooks/useTheme";

const CityButton: FC = () => {
  const { theme } = useTheme();
  const darkModeClass = theme === "dark" ? `${styles.dark_mode}` : "";
  return (
    <button className={styles.city}>
      <span className={`${styles.city__span} ${darkModeClass}`}>
        <LocationSvg />
      </span>
      <span className={`${styles.city__text} ${darkModeClass}`}>Moscow</span>
    </button>
  );
};

export default CityButton;
