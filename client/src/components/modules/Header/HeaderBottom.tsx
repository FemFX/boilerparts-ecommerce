import { FC } from "react";
import styles from "@/styles/header/index.module.scss";
import { useTheme } from "@/hooks/useTheme";
import Link from "next/link";
import Image from "next/image";
import SearchSvg from "@/components/ui/SearchSvg";
import SearchInput from "@/components/ui/Header/SearchInput";
import ModeToggler from "@/components/ui/ModeToggler";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import CartPopup from "./CartPopup";

const HeaderBottom: FC = () => {
  const isMedia950 = useMediaQuery(950);
  const { theme } = useTheme();
  const darkModeClass = theme === "dark" ? `${styles.dark_mode}` : "";
  return (
    <div
      className={styles.header__bottom}
      style={{
        backgroundColor: theme === "dark" ? "#2d2d2d" : "",
      }}
    >
      <div className={`container ${styles.header__bottom__container}`}>
        <h1 className={styles.header__logo}>
          <Link href="/dashboard" legacyBehavior passHref>
            <a className={styles.header__logo__link}>
              <Image src="/img/logo.svg" width={30} height={30} alt="logo" />
              <span
                className={`${styles.header__logo__link__text} ${darkModeClass}`}
              >
                Детали для газовых котлов
              </span>
            </a>
          </Link>
        </h1>
        <div className={styles.header__search}>
          <SearchInput />
          <button className={`${styles.header__search__btn} ${darkModeClass}`}>
            <span className={styles.header__search__btn__span}>
              <SearchSvg />
            </span>
          </button>
        </div>
        <div className={styles.header__shopping_cart}>
          {!isMedia950 && <ModeToggler />}
          <CartPopup />
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
