import { useTheme } from "@/hooks/useTheme";
import { FC } from "react";
import styles from "@/styles/catalog/index.module.scss";
import { IBoilerPart } from "@/types/boilerparts";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/utils/common";
import CartHoverSvg from "@/components/ui/CartHoverSvg";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import CartHoverCheckedSvg from "@/components/ui/CartHoverCheckedSvg";

const CatalogItem: FC<{ item: IBoilerPart }> = ({ item }) => {
  const { theme } = useTheme();
  const darkModeClass = theme === "dark" ? `${styles.dark_mode}` : "";

  const { cart } = useTypedSelector((state) => state.cart);

  const isInCart = cart.some((cartItem) => cartItem.partId === item.id);

  const regex = /"(.*?)"/;
  const match = regex.exec(item.images);
  const firstStringInQuotes = match![1] || "";

  return (
    <li className={`${styles.catalog__list__item} ${darkModeClass}`}>
      <Image
        src={firstStringInQuotes}
        width={100}
        height={100}
        alt={item.name}
      />
      <div className={styles.catalog__list__item__inner}>
        <Link href={`/catalog/${item.id}`}>
          <h3 className={styles.catalog__list__item__title}>{item.name}</h3>
        </Link>
        <span className={styles.catalog__list__item__code}>
          Артикул: {item.vendor_code}
        </span>
        <span className={styles.catalog__list__item__price}>
          {formatPrice(item.price)} P
        </span>
      </div>
      <button
        className={`${styles.catalog__list__item__cart} ${
          isInCart ? styles.added : ""
        }`}
      >
        {isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}
      </button>
    </li>
  );
};

export default CatalogItem;
