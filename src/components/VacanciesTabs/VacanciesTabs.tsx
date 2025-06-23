"use client";

import { useEffect, useState } from "react";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { Tabs } from "@/components/ui/tabs";
import { VacancyType } from "@/lib/types/vacancy";

import { VacancyCityTabs } from "./VacancyCityTabs";
import { VacancyContentPanel } from "./VacancyContentPanel";

type Props = {
  grouped: Record<string, VacancyType[]>;
  profession: string;
  country: string;
  initialCity?: string;
  initialVacancyId?: string;
  showFilters?: boolean;
};

export default function VacanciesTabs({
  grouped,
  profession,
  country,
  initialCity,
  showFilters = true
}: Props) {
  const router = useRouter();
  const segments = useSelectedLayoutSegments();

  const segmentCity = decodeURIComponent(segments[0] || "");
  const segmentSlug = decodeURIComponent(segments[2] || "");

  const cities = Object.keys(grouped);
  const [activeCity, setActiveCity] = useState(initialCity || cities[0] || "");
  const [selectedVacancy, setSelectedVacancy] = useState<VacancyType | null>(null);

  const onCityChange = (city: string) => {
    setActiveCity(city);
    setSelectedVacancy(null);
    router.push(`/vacancies/${city}/${profession}`);
  };

  const onVacancySelect = (vacancy?: VacancyType | null) => {
    if (!vacancy) {
  setSelectedVacancy(null);
  if (segmentSlug) {
    router.push(`/vacancies/${activeCity}/${profession}`);
  }
  return;
}


    setSelectedVacancy(vacancy);

if (segmentSlug !== vacancy.slug) {
  router.push(`/vacancies/${vacancy.city}/${profession}/${vacancy.title}`);
}

  };

  useEffect(() => {
    const cityFromURL = segmentCity || initialCity || cities[0];

    if (!cityFromURL || !grouped[cityFromURL]) return;
    if (cityFromURL !== activeCity) setActiveCity(cityFromURL);

    const found = grouped[cityFromURL].find((v) => v.slug === segmentSlug);

    if (found && (!selectedVacancy || found.slug !== selectedVacancy.slug)) {
      setSelectedVacancy(found);
    } 
  }, [segmentCity, segmentSlug, grouped]);

  if (cities.length === 0) {
    return <div>Нет данных для отображения</div>;
  }

  return (
    <Tabs
      value={activeCity}
      onValueChange={onCityChange}
      className="w-full max-w-screen-xl grid md:grid-cols-4 gap-4"
    >
      <VacancyCityTabs
        cities={cities}
        activeCity={activeCity}
        onCityChange={onCityChange}
        grouped={grouped}
        showFilters={showFilters}
      />
      <VacancyContentPanel
        cities={cities}
        activeCity={activeCity}
        grouped={grouped}
        selectedVacancy={selectedVacancy}
        onVacancySelect={onVacancySelect}
        initialSlug={segmentSlug}
        showFilters={showFilters}
      />
    </Tabs>
  );
}
