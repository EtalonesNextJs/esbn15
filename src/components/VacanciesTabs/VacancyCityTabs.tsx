// components/VacancyTabs/VacancyCityTabs.tsx
"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type Props = {
  cities: string[];
  activeCity: string;
  onCityChange: (city: string) => void;
  grouped: Record<string, any[]>;
};

export const VacancyCityTabs = ({ cities, activeCity, onCityChange, grouped }: Props) => {
  return (
    <div className=" ">
    <TabsList className="flex flex-wrap gap-2 h-max col-span-1">
      {cities.map((city) => (
        <TabsTrigger
          key={city}
          value={city}
          className="relative py-2 px-5 border border-gray-300 group"
        >
          <p className="text-xs font-semibold">{city}</p>
          <Badge
            variant="secondary"
            className="bg-none p-auto text-gray-500 text-xs rounded-full absolute top-0 right-0"
          >
            {grouped[city]?.length || 0}
          </Badge>
        </TabsTrigger>
      ))}
    </TabsList>
    </div>
  );
};
