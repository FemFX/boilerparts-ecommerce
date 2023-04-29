import { FC } from "react";
import { useTheme } from "@/hooks/useTheme";
import styles from "@/styles/catalog/index.module.scss";
import { motion } from "framer-motion";
import { IManufacturersBlockProps } from "@/types/catalog";

const ManufacturersBlock: FC<IManufacturersBlockProps> = ({ title }) => {
  const { theme } = useTheme();
  const darkModeClass = theme === "dark" ? `${styles.dark_mode}` : "";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${styles.dashboard__alert} ${darkModeClass}`}
    >
      <h3 className={`${styles.manufacturers__title} ${darkModeClass}`}>
        {title}
      </h3>
      <ul className={styles.manufacturers__list}>
        {[].map((item) => (
          <li key={item}></li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ManufacturersBlock;
