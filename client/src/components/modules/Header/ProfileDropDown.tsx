import ProfileSvg from "@/components/ui/ProfileSvg";
import { useTheme } from "@/hooks/useTheme";
import { IWrappedComponentProps } from "@/types/common";
import { forwardRef } from "react";
import styles from "@/styles/ProfileDropDown/index.module.scss";
import { withClickOutside } from "@/utils/withClickOutside";
import { AnimatePresence, motion } from "framer-motion";
import LogoutSvg from "@/components/ui/LogoutSvg";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import { useRouter } from "next/router";

const ProfileDropDown = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const { theme } = useTheme();
    const darkModeClass = theme === "dark" ? `${styles.dark_mode}` : "";
    const { logout } = useActions();
    const router = useRouter();

    const toggleProfileDropDown = () => setOpen(!open);

    const { user } = useTypedSelector((state) => state.auth);

    const handleLogout = async () => {
      await logout();
      return router.push("/");
    };

    return (
      <div className={styles.profile} ref={ref}>
        <button className={styles.profile__btn} onClick={toggleProfileDropDown}>
          <span className={styles.profile__span}>
            <ProfileSvg />
          </span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={`${styles.profile__dropdown} ${darkModeClass}`}
              style={{ transformOrigin: "right top" }}
            >
              <li className={styles.profile__dropdown__user}>
                <span
                  className={`${styles.profile__dropdown__username} ${darkModeClass}`}
                >
                  {user?.username}
                </span>
                <span
                  className={`${styles.profile__dropdown__email} ${darkModeClass}`}
                ></span>
              </li>
              <li className={styles.profile__dropdown__item}>
                <button
                  className={styles.profile__dropdown__item__btn}
                  onClick={handleLogout}
                >
                  <span
                    className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}
                  >
                    Выйти
                  </span>
                  <span
                    className={`${styles.profile__dropdown__item__svg} ${darkModeClass}`}
                  >
                    <LogoutSvg />
                  </span>
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
ProfileDropDown.displayName = "ProfileDropdown";
export default withClickOutside(ProfileDropDown);
