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
  onAdd: (value: string) => void;
  optionList: Option[];
};

export const Autocomplete = ({
  label,
  onAdd,
  optionList,
}: AutocompleteProps) => {
  const [inputItems, setInputItems] = React.useState(optionList);
  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
    selectItem,
    inputValue,
  } = useCombobox({
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
      <div>
        <input className={styles.input} {...getInputProps()} />
        <button
          className={styles.addButton}
          aria-label="add item"
          disabled={!inputValue.length}
          onClick={() => {
            selectItem(null);
            onAdd(inputValue);
          }}
        >
          &#43;
        </button>
        <button
          className={styles.clearButton}
          aria-label="clear item"
          onClick={() => selectItem(null)}
        >
          &#10007;
        </button>
      </div>
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
