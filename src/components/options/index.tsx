
import { useState } from "react";

interface DropdownMenuProps<T> {
  opciones: T[];
  onSelect: (opcion: T) => void;
  name: string;
}

const DropdownMenu = <T extends string>({ opciones, onSelect, name }: DropdownMenuProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<T | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left w-full">
      <button
        onClick={toggleMenu}
        className="w-full bg-black text-white px-4 py-2 rounded-md focus:outline-none border border-gray-300"
      >
        {selectedOption ? selectedOption : name}
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-40 overflow-auto">
          {opciones.map((opcion, index) => (
            <li
              key={index}
              className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelectedOption(opcion);
                onSelect(opcion);
                setIsOpen(false);
              }}
            >
              {opcion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { DropdownMenu };
