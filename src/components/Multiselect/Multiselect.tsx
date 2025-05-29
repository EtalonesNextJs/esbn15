
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import {  useCallback } from "react";

type Country = Record<"value" | "label", string>;

const COUNTRIES = [
  {
    value: "Паспорт ЕС",
    label: "Паспорт ЕС",
  },
  {
    value: "Паспорт",
    label: "Паспорт",
  },
  {
    value: "Польская виза",
    label: "Польская виза",
  },
  {
    value: "Карта побыта",
    label: "Карта побыта",
  },
  {
    value: "Биометрия Украины",
    label: "Биометрия Украины",
  },
  {
    value: "Песель",
    label: "Песель",
  },
] satisfies Country[];

interface MultiSelectProps {
  selected: Country[];
  setSelected: React.Dispatch<React.SetStateAction<Country[]>>;
}

export default function MultiSelect({ selected, setSelected }: MultiSelectProps) {
  const handleToggleSelect = useCallback((country: Country) => {
    setSelected((prev) => {
      if (prev.some((selectedCountry) => selectedCountry.value === country.value)) {
        return prev.filter((s) => s.value !== country.value); // Unselect
      } else {
        return [...prev, country]; // Select
      }
    });
  }, [setSelected]);

  return (
    <div className="w-full">
      <div className="rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((country) => {
            return (
              <Badge
                key={country.value}
                variant="secondary"
                className="select-none"
              >
                {country.label}
                <X
                  className="size-3 text-muted-foreground hover:text-foreground ml-2 cursor-pointer"
                  onClick={() => handleToggleSelect(country)} // Unselect when clicked
                />
              </Badge>
            );
          })}
        </div>
      </div>
      
      {/* Multiple choice buttons */}
      <div className="mt-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {COUNTRIES.map((country) => (
            <button
              type="button"
              key={country.value}
              onClick={() => handleToggleSelect(country)}
              className={`p-2 rounded-md border ${selected.some((selectedCountry) => selectedCountry.value === country.value) ? "bg-[#116948] text-white" : "bg-white text-black"}`}
            >
              {country.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
