'use client';

import VacanciesTabs from "@/components/VacanciesTabs/VacanciesTabs";
import { Filter } from "lucide-react";
import { Breadcrumbs } from "../breadcrumbs/Breadcrumbs";
import { useFilter } from "@/context/FilterContext";

interface Props {
  grouped: any;
  profession: string;
  country: string;
  initialCity?: string;
  initialVacancyId?: string;
}

export default function VacanciesTabsClient({
  grouped,
  profession,
  country,
  initialCity,
  initialVacancyId,
}: Props) {
  const { isOpen, toggleFilter } = useFilter();

  return (
    <div className="w-full mb-5">
      <div className="flex justify-between items-center mb-3">
        <Breadcrumbs />
        <button
          className="p-2 hover:bg-gray-100 rounded"
          onClick={toggleFilter}
          title="Фильтр"
        >
        <p>Быстрая навигация</p>
        </button>
      </div>

      <VacanciesTabs
        grouped={grouped}
        profession={profession}
        country={country}
        initialCity={initialCity}
        initialVacancyId={initialVacancyId}
        showFilters={isOpen} 
      />
    </div>
  );
}
