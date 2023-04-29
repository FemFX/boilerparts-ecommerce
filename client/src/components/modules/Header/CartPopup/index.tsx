import { useTheme } from "@/hooks/useTheme";
import { IWrappedComponentProps } from "@/types/common";
import { forwardRef } from "react";
import styles from "@/styles/cartPopup/index.module.scss";
import { withClickOutside } from "@/utils/withClickOutside";
import { AnimatePresence, motion } from "framer-motion";
import ShoppingCartSvg from "@/components/ui/ShoppingCart";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import Link from "next/link";

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const { theme } = useTheme();
    const darkModeClass = theme === "dark" ? `${styles.dark_mode}` : "";

    const { cart } = useTypedSelector((state) => state.cart);

    const toggleCartDropDown = () => setOpen(!open);

    return (
      <div className={styles.cart} ref={ref}>
        <button
          className={`${styles.cart__btn} ${darkModeClass}`}
          onClick={toggleCartDropDown}
        >
          <span className={styles.cart__svg}>
            <ShoppingCartSvg />
          </span>
          <span className={styles.cart__text}>Корзина</span>
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
              <h3 className={styles.cart__popup__title}>Корзина</h3>
              <ul className={styles.cart__popup__list}>
                {cart.length ? (
                  cart.map((item) => <li key={item.id}></li>)
                ) : (
                  <li className={styles.cart__popup__empty}>
                    <span
                      className={`${styles.cart__popup__empty__text} ${darkModeClass}`}
                    >
                      Корзина пуста
                    </span>
                  </li>
                )}
              </ul>
              <div className={styles.cart__popup__footer}>
                <div className={styles.cart__popup__footer__total}>
                  <span
                    className={`${styles.cart__popup__footer__text} ${darkModeClass}`}
                  >
                    Обшая сумма заказа:
                  </span>
                  <span className={styles.cart__popup__footer__price}>0</span>
                </div>
              </div>
              <Link href={"/order"}>
                <button
                  className={styles.cart__popup__footer__btn}
                  disabled={!cart.length}
                >
                  Оформить заказ
                </button>
              </Link>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
CartPopup.displayName = "ProfileDropdown";
export default withClickOutside(CartPopup);
