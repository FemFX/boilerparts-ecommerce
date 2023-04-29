import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, FC } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from "@/styles/dashboard/index.module.scss";
import Image from "next/image";
import BrandsSliderNextArrow from "@/components/ui/BrandsSliderNextArrow";
import BrandsSliderPrevArrow from "@/components/ui/BrandsSliderPrevArrow";

const BrandSlider: FC = () => {
  const isMedia768 = useMediaQuery(768);
  const { theme } = useTheme();
  const darkModeClass = theme === "dark" ? `${styles.dark_mode}` : "";
  const brandItems = [
    { id: 1, img: "/img/brand-1.png", alt: "brand-1" },
    { id: 2, img: "/img/brand-3.png", alt: "brand-3" },
    { id: 3, img: "/img/brand-2.svg", alt: "brand-2" },
    { id: 4, img: "/img/brand-4.png", alt: "brand-4" },
    { id: 5, img: "/img/brand-1.png", alt: "brand-1" },
    { id: 6, img: "/img/brand-3.png", alt: "brand-3" },
    { id: 7, img: "/img/brand-2.svg", alt: "brand-2" },
    { id: 8, img: "/img/brand-1.png", alt: "brand-1" },
    { id: 9, img: "/img/brand-3.png", alt: "brand-3" },
    { id: 10, img: "/img/brand-4.png", alt: "brand-4" },
    { id: 11, img: "/img/brand-2.svg", alt: "brand-2" },
    { id: 12, img: "/img/brand-1.png", alt: "brand-1" },
  ];
  // useEffect(() => {
  //   const slider = document.querySelector(
  //     `.${styles.dashboard__brands__slider}`
  //   );

  //   const list = slider?.querySelector(".slick-list") as HTMLElement;

  //   list.style.height = isMedia768 ? "60px" : "80px";
  // }, [isMedia768]);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoPlay: true,
    speed: 500,
    variableWidth: true,
    nextArrow: <BrandsSliderNextArrow modeClass={darkModeClass} />,
    prevArrow: <BrandsSliderPrevArrow modeClass={darkModeClass} />,
  };
  return (
    <Slider {...settings} className={styles.dashboard__brands__slider}>
      {brandItems.map((item) => (
        <div
          key={item.id}
          className={`${styles.dashboard__brands__slide} ${darkModeClass}`}
          style={{ width: isMedia768 ? 124 : 180 }}
        >
          <Image src={item.img} alt={item.alt} width={180} height={80} />
        </div>
      ))}
    </Slider>
  );
};

export default BrandSlider;
