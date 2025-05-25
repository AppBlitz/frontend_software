import React from "react";
import "./css/combobox.css"
interface ComboboxProps<T> {
  items: T[];
  onSelect: (item: T) => void;
  renderItem: (item: T) => React.ReactNode;
  placeholder?: string;
}

const Combobox = <T,>({ items, onSelect, renderItem, placeholder }: ComboboxProps<T>) => {
  return (
    <div className="combobox-container">
      <select className="combobox-select" onChange={(e) => onSelect(items[parseInt(e.target.value)])}>
        <option value="">{placeholder || "Selecciona una opción"}</option>
        {items.map((item, index) => (
          <option key={index} value={index}>
            {renderItem(item)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Combobox;
