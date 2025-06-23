'use client';

import { createContext, useContext, useState } from 'react';

interface FilterContextType {
  isOpen: boolean;
  openFilter: () => void;
  closeFilter: () => void;
  toggleFilter: () => void;
  setFilterState: (state: boolean) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true); // по умолчанию закрыт

  return (
    <FilterContext.Provider
      value={{
        isOpen,
        openFilter: () => setIsOpen(true),
        closeFilter: () => setIsOpen(false),
        toggleFilter: () => setIsOpen((prev) => !prev),
        setFilterState: setIsOpen,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error("useFilter must be used within FilterProvider");
  return context;
};
