import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, FC } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from "@/styles/dashboard/index.module.scss";
import skeletonStyles from "@/styles/skeleton/index.module.scss";
import Image from "next/image";
import BrandsSliderNextArrow from "@/components/ui/BrandsSliderNextArrow";
import BrandsSliderPrevArrow from "@/components/ui/BrandsSliderPrevArrow";
import { IDashboardSlider } from "@/types/dashboard";
import Link from "next/link";
import { formatPrice } from "@/utils/common";

const DashboardSlider: FC<IDashboardSlider> = ({
  items,
  spinner,
  goToPartPage,
}) => {
  const isMedia768 = useMediaQuery(768);
  const isMedia1366 = useMediaQuery(1366);
  const isMedia800 = useMediaQuery(800);
  const isMedia560 = useMediaQuery(560);
  const { theme } = useTheme();
  const darkModeClass = theme === "dark" ? `${styles.dark_mode}` : "";

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: items.length >= 4 ? 4 : items.length - 1,
    slidesToScroll: isMedia768 ? 1 : 2,
    autoPlay: true,
    speed: 500,
    variableWidth: true,
    arrows: false,
  };
  const width = {
    width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344,
  };
  const regex = /"(.*?)"/;
  const match = regex.exec(items[0].images);
  const firstStringInQuotes = match![1] || "";

  return (
    <Slider {...settings} className={styles.dashboard__slider}>
      {spinner ? (
        [...Array(8)].map((_, i) => (
          <div
            className={`${skeletonStyles.skeleton__item} ${
              theme === "dark" ? `${skeletonStyles.dark_mode}` : ""
            }`}
            key={i}
            style={width}
          >
            <div className={skeletonStyles.skeleton__item__light} />
          </div>
        ))
      ) : items.length ? (
        items.map((item) => (
          <div
            className={`${styles.dashboard__slide} ${darkModeClass}`}
            key={item.id}
            style={width}
          >
            <Image
              src={firstStringInQuotes}
              width={100}
              height={100}
              alt={item.name}
            />
            <div className={styles.dashboard__slide__inner}>
              <Link href={goToPartPage ? `/catalog/${item.id}` : "/catalog"}>
                <h3 className={styles.dashboard__slide__title}>{item.name}</h3>
              </Link>
              <span className={styles.dashboard__slide__code}>
                Артикул : {item.vendor_code}
              </span>
              <span className={styles.dashboard__slide__price}>
                {formatPrice(item.price)} P
              </span>
            </div>
          </div>
        ))
      ) : (
        <span>Список товарор пуст...</span>
      )}
    </Slider>
    // <div>123</div>
  );
};

export default DashboardSlider;
