import { useTheme } from "@/hooks/useTheme";
import {
  controlStyles,
  menuStyles,
  selectStyles,
} from "@/styles/catalog/select";
import { optionStyles } from "@/styles/searchInput";
import { IOption, SelectOptionType } from "@/types/common";
import { createSelectOption } from "@/utils/common";
import { categoriesOptions } from "@/utils/selectContents";
import { Dispatch, SetStateAction, useState } from "react";
import { FC } from "react";
import Select from "react-select";

interface IFilterSelectProps {
  categoryOption: SelectOptionType;
  setCategoryOption: Dispatch<SetStateAction<SelectOptionType>>;
}

const FilterSelect: FC<IFilterSelectProps> = ({
  categoryOption,
  setCategoryOption,
}) => {
  const { theme } = useTheme();

  const handleSortOptionChange = (selectedOption: SelectOptionType) => {
    setCategoryOption(selectedOption);
  };
  return (
    <Select
      placeholder="Я ишу..."
      value={categoryOption || createSelectOption("Сначала дешевые")}
      onChange={handleSortOptionChange}
      styles={{
        ...selectStyles,
        control: (defaultStyles) => ({
          ...controlStyles(defaultStyles, theme),
        }),
        input: (defaultStyles) => ({
          ...defaultStyles,
          color: theme === "dark" ? "#f2f2f2" : "#222222",
        }),
        menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles, theme),
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, theme),
        }),
      }}
      isSearchable={false}
      options={categoriesOptions}
    />
  );
};

export default FilterSelect;
