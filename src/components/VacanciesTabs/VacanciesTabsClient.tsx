'use client';

import VacanciesTabs from "@/components/VacanciesTabs/VacanciesTabs";
import {  ArrowDown, ArrowUp} from "lucide-react"; 
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
    <div className="max-w-screen-xl mx-auto px-5">
      <div className="w-full flex justify-between flex-wrap items-center mb-3">
        <Breadcrumbs />
       <button
  className="p-2 hover:bg-gray-100 rounded"
  onClick={toggleFilter}
  title="Фильтр"
>
  <div className="text-md font-medium w-max flex items-center gap-1">
    Быстрая навигация{" "}
    {isOpen ? (
      <ArrowUp className="transition-transform duration-200" />
    ) : (
      <ArrowDown className="transition-transform duration-200" />
    )}
  </div>
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
