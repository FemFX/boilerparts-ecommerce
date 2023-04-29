import { SelectOptionType } from "@/types/common";
import { FC, useState } from "react";
import Select from "react-select";
import {
  controlStyles,
  inputStyles,
  menuStyles,
  optionStyles,
} from "@/styles/searchInput";
import { useTheme } from "@/hooks/useTheme";

const SearchInput: FC = () => {
  const { theme } = useTheme();

  const [searchOption, setSearchOption] = useState<SelectOptionType>(null);

  const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
    setSearchOption(selectedOption);
  };

  return (
    <Select
      placeholder="Я ишу..."
      value={searchOption}
      onChange={handleSearchOptionChange}
      styles={{
        ...inputStyles,
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
      isClearable={true}
      openMenuOnClick={false}
      options={[1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15].map((item) => ({
        value: item,
        label: item,
      }))}
    />
    // <Select
    //   placeholder="Я ишу..."
    //   value={searchOption}
    //   onChange={handleSearchOptionChange}
    // />
  );
};

export default SearchInput;
