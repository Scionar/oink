import * as React from "react";
import { useCombobox } from "downshift";
import styles from "./Autocomplete.module.css";

type Option = {
  name: string;
  calories: string;
  id: string;
};

type AutocompleteProps = {
  label: string;
  optionList: Option[];
};

export const Autocomplete = ({ label, optionList }: AutocompleteProps) => {
  const [inputItems, setInputItems] = React.useState(optionList);
  const { isOpen, getLabelProps, getMenuProps, getInputProps, getItemProps } =
    useCombobox({
      items: inputItems,
      itemToString: (item: Option | null) => {
        return item ? item.name : "";
      },
      onInputValueChange: ({ inputValue }) => {
        setInputItems(
          optionList.filter((item) => {
            const value = inputValue ? inputValue.toLowerCase() : "";
            return item.name.toLowerCase().startsWith(value);
          })
        );
      },
    });

  return (
    <div className={styles.container}>
      <label className={styles.label} {...getLabelProps()}>
        {label}
      </label>
      <input className={styles.input} {...getInputProps()} />
      <ul {...getMenuProps()} className={styles.optionList}>
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              className={styles.option}
              key={`${item}${index}`}
              {...getItemProps({
                item,
                index,
              })}
            >
              {item.name} / {item.calories}
            </li>
          ))}
      </ul>
    </div>
  );
};
