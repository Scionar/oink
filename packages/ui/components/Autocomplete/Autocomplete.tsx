import * as React from "react";
import { useCombobox, UseComboboxStateChange } from "downshift";
import styles from "./Autocomplete.module.css";
import { Label } from "../../common/Label/Label";

export type Option = {
  name: string;
  calories: string;
  id: string;
};

type AutocompleteProps = {
  label: string;
  name: string;
  required?: boolean;
  optionList: Option[];
  onSelectedItemChange?: (option: Option | null | undefined) => void;
};

export const Autocomplete = ({
  label,
  optionList,
  name,
  required = false,
  onSelectedItemChange,
}: AutocompleteProps) => {
  const [inputItems, setInputItems] = React.useState(optionList);
  const { isOpen, getMenuProps, getInputProps, getItemProps } = useCombobox({
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
    onSelectedItemChange: (changes: UseComboboxStateChange<Option>) => {
      onSelectedItemChange && onSelectedItemChange(changes.selectedItem);
    },
  });

  return (
    <div className={styles.container}>
      <Label required={required}>{label}</Label>
      <input
        className={styles.input}
        {...getInputProps()}
        name={name}
        required={required}
      />
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
