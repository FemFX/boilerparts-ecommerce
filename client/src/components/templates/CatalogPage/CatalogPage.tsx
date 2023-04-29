import { FC, useEffect, useState } from "react";
import styles from "@/styles/catalog/index.module.scss";
import { useTheme } from "@/hooks/useTheme";
import { AnimatePresence } from "framer-motion";
import ManufacturersBlock from "@/components/modules/CatalogPage/ManufacturersBlock";
import FilterSelect from "@/components/modules/CatalogPage/FilterSelect";
import { useQuery } from "@tanstack/react-query";
import { getBoilerParts } from "@/services/boilerparts.service";
import { toast } from "react-toastify";
import skeletonStyles from "@/styles/skeleton/index.module.scss";
import CatalogItem from "@/components/modules/CatalogPage/CatalogItem";
import { IOption, SelectOptionType } from "@/types/common";
import ReactPaginate from "react-paginate";

const CatalogPage: FC = () => {
  const { theme } = useTheme();
  const darkModeClass = theme === "dark" ? `${styles.dark_mode}` : "";

  // const [sortParam, setSortParam] = useState("Сначала дешевые");
  const [categoryOption, setCategoryOption] = useState<SelectOptionType>({
    value: "Сначала дешевые",
    label: "Сначала дешевые",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["boilerparts"],
    queryFn: () => getBoilerParts(),
    onError(err) {
      toast.error((err as Error).message);
    },
  });
  useEffect(() => {
    console.log(categoryOption);

    if (data) {
      switch ((categoryOption as IOption).value) {
        case "Сначала дешевые":
          data.rows.sort((a, b) => a.price - b.price);
        case "Сначала дорогие":
          data.rows.sort((a, b) => b.price - a.price);
        case "По популярности":
          data.rows.sort((a, b) => b.popularity - a.popularity);
      }
    }
    return;
  }, [categoryOption]);

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>
          Каталог товаров
        </h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          <AnimatePresence>
            <ManufacturersBlock title="Производитель котлов:" />
          </AnimatePresence>
          <AnimatePresence>
            <ManufacturersBlock title="Производитель запчастей:" />
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            <button>Сбросить фильтр</button>
            <FilterSelect
              categoryOption={categoryOption}
              setCategoryOption={setCategoryOption}
            />
          </div>
        </div>
        <div className={`${styles.catalog__bottom}`}>
          <div className={styles.catalog__bottom__inner}>
            <div className={""}>Фильтры</div>
            {isLoading ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(8)).map((item) => (
                  <li
                    key={item}
                    className={`${skeletonStyles.skeleton__item} ${
                      theme === "dark" ? `${skeletonStyles.dark_mode}` : ""
                    }`}
                  >
                    <div className={skeletonStyles.skeleton__item__light}></div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={styles.catalog__list}>
                {data?.rows.length ? (
                  data?.rows.map((item) => (
                    <CatalogItem key={item.id} item={item} />
                  ))
                ) : (
                  <span>Список товаров пуст...</span>
                )}
              </ul>
            )}
          </div>
          {data && (
            <ReactPaginate
              containerClassName={styles.catalog__bottom__list}
              pageClassName={styles.catalog__bottom__list__item}
              pageLinkClassName={styles.catalog__bottom__list__item__link}
              breakLabel="..."
              pageCount={data?.count / 20}
              forcePage={1}
              // onPageChange={}
              previousClassName={styles.catalog__bottom__list__prev}
              nextClassName={styles.catalog__bottom__list__next}
              breakClassName={styles.catalog__list__break__link}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default CatalogPage;
