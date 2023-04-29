import { IBoilerParts } from "@/types/boilerparts";
import { instance } from "@/utils/axiosClient";

export const PRODUCTS = "products";

export const getBestsellers = async () => {
  const { data } = await instance.get<IBoilerParts>(`/${PRODUCTS}/bestsellers`);
  return data;
};
export const getNewBoilerParts = async () => {
  const { data } = await instance.get<IBoilerParts>(`/${PRODUCTS}/new`);
  return data;
};
export const getBoilerParts = async (
  limit: number = 20,
  offset: number = 0
) => {
  const { data } = await instance.get<IBoilerParts>(
    `/${PRODUCTS}?limit=${limit}&offset=${offset}`
  );
  return data;
};
