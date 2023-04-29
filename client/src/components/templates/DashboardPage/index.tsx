import { FC, useState } from "react";
import styles from "@/styles/dashboard/index.module.scss";
import BrandSlider from "@/components/modules/DashboardPage/BrandSlider";
import { IBoilerPart } from "@/types/boilerparts";
import { useQuery } from "@tanstack/react-query";
import {
  getBestsellers,
  getNewBoilerParts,
} from "@/services/boilerparts.service";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useTheme } from "@/hooks/useTheme";
import DashboardSlider from "@/components/modules/DashboardPage/DashboardSlider";

const DashboardPage: FC = () => {
  const { theme } = useTheme();
  const darkModeClass = theme === "dark" ? `${styles.dark_mode}` : "";
  const {
    data: newBoilerParts,
    isLoading: newBoilerPartsLoading,
    isSuccess: newBoilerPartsSuccess,
  } = useQuery({
    queryKey: ["newParts"],
    queryFn: () => getNewBoilerParts(),
    onError(err) {
      toast.error((err as AxiosError).message);
    },
  });
  const {
    data: bestsellers,
    isLoading: bestsellersLoading,
    isSuccess: bestsellersSuccess,
  } = useQuery({
    queryKey: ["bestsellers"],
    queryFn: () => getBestsellers(),
    onError(err) {
      toast.error((err as AxiosError).message);
    },
  });

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <div className={styles.dashboard__brands}>
          <BrandSlider />
        </div>
        <h2 className={`${styles.dashboard__title} ${darkModeClass}`}>
          Детали для газовых котлов
        </h2>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Хиты продаж
          </h3>
          {bestsellersSuccess ? (
            <DashboardSlider
              items={bestsellers.rows || []}
              spinner={bestsellersLoading}
            />
          ) : (
            <p>Произошла ошибка</p>
          )}
        </div>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Новинки
          </h3>
          {newBoilerPartsSuccess ? (
            <DashboardSlider
              items={newBoilerParts.rows || []}
              spinner={newBoilerPartsLoading}
            />
          ) : (
            <p>Произошла ошибка</p>
          )}
        </div>
        <div className={styles.dashboard__about}>
          <h3
            className={`${styles.dashboard__parts__title} ${styles.dashboard__about__title} ${darkModeClass}`}
          >
            О компании
          </h3>
          <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
            Инструкции и схемы помогут разобраться в эксплуатации, определить
            неисправность и правильно выбрать запчасть для ремонта Вашего
            газового оборудования. Купить запчасть, деталь для ремонта газового
            котла возможно в любом населенном пункте Российской Федерации:
            Осуществляем доставку запчасти к газовым котлам в следующие города:
            Москва, Сан
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
