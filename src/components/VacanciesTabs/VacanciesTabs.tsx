
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VacanciesByCityAccordion from "@/components/VacancyGrouped/VacanciesByCityAccordion";
import { VacancyType } from "@/lib/types/vacancy";
import { Badge } from "../ui/badge";
import { Coins } from "lucide-react";
import { VacancyButton } from "../VacancyButton/VacancyButton";

import { useSelectedLayoutSegments } from 'next/navigation';


type Props = {
  grouped: Record<string, VacancyType[]>;
  profession: string;
  country: string;
  initialCity?: string;
  initialVacancyId?: string;
};

export default function VacanciesTabs({
  grouped,
  profession,
  country,
  initialCity,
  initialVacancyId,
}: Props) {
  const router = useRouter();
  const segments = useSelectedLayoutSegments();
  const segmentCity = decodeURIComponent(segments[0] || "");
const segmentProfession = decodeURIComponent(segments[1] || "");
const segmentSlug = decodeURIComponent(segments[2] || "");
  const cities = Object.keys(grouped);
  const [activeCity, setActiveCity] = useState(initialCity || cities[0] || "");
  const [selectedVacancy, setSelectedVacancy] = useState<VacancyType | null>(null);

  const onCityChange = (city: string) => {
    setActiveCity(city);
    setSelectedVacancy(null);
    router.push(`/vacancies/${city}/${profession}`,{ scroll: false });
  };

const onVacancySelect = (vacancy?: VacancyType | null) => {
  if (!vacancy) {
    setSelectedVacancy(null);
    router.push(`/vacancies/${activeCity}/${profession}`,{ scroll: false });
    return;
  }

  setSelectedVacancy(vacancy);
  router.push(`/vacancies/${vacancy.city}/${profession}/${vacancy.slug}`,{ scroll: false });
};

useEffect(() => {
  const cityFromURL = segmentCity || initialCity || cities[0];

  if (!cityFromURL || !grouped[cityFromURL]) return;

  if (cityFromURL !== activeCity) setActiveCity(cityFromURL);

  const found = grouped[cityFromURL].find((v) => v.slug === segmentSlug);

  if (found && (!selectedVacancy || found.slug !== selectedVacancy.slug)) {
    setSelectedVacancy(found);
  } else if (!found && selectedVacancy) {
    setSelectedVacancy(grouped[cityFromURL][0] || null);
  }
}, [segmentCity, segmentSlug, grouped]);


 
  if (cities.length === 0) {
    return <div>Нет данных для отображения</div>;
  }

  return (
    <Tabs
      value={activeCity}
      onValueChange={onCityChange}
      className="w-full max-w-screen-xl grid grid-cols-4 gap-4"
    >
      <TabsList className="flex flex-wrap gap-2 h-max col-span-1">
        {cities.map((city) => (
          <TabsTrigger
            key={city}
            value={city}
            className="relative p-5 border border-gray-300 group"
          >
            <p className="text-xs font-semibold">{city}</p>
            <Badge
              variant="secondary"
              className="bg-none p-auto text-gray-500 text-xs rounded-full absolute top-0 right-0"
            >
              {grouped[city].length}
            </Badge>
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="col-span-3">
        {cities.map((city) => (
          <TabsContent key={city} value={city}>
            <VacanciesByCityAccordion
              city={city}
              vacancies={grouped[city]}
              onVacancySelect={onVacancySelect}
              initialSlug={segmentSlug} 
            />
            {selectedVacancy && selectedVacancy.city === city && (
              <><div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="rounded-md border border-gray-300 bg-white p-2 shadow-sm relative">
                            <p className="absolute top-1 left-1 text-sm text-gray-600">Заработная плата:</p>
                            <div className="flex gap-2 items-center p-5">
                                <span className="text-xl font-bold">{selectedVacancy.salary}</span>
                            </div>
                        </div>
                        <div className="rounded-md border border-gray-300 bg-white p-2 shadow-sm relative">
                            <p className="absolute top-1 left-1 text-sm text-gray-600">Проживание:</p>
                            <div className="flex gap-2 items-center p-5">
                                <span className="text-xl font-bold">{selectedVacancy.homePrice}</span>
                            </div>
                        </div>
                        <div className="rounded-md border border-gray-300 bg-white p-2 shadow-sm relative">
                            <p className="absolute top-1 left-1 text-sm text-gray-600">
                                Средняя зарплата чистыми:
                            </p>
                            <div className="flex gap-2 items-center p-5">
                                <span className="text-xl font-bold">{selectedVacancy?.avSalary} EUR/мес.</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 text-[17px] leading-relaxed text-muted-foreground bg-gray-100 p-5 rounded-lg col-span-4">
                            <div className="flex justify-start items-end"><span className="text-xl font-bold">Вакансия {selectedVacancy?.title} в городе {selectedVacancy?.city}, {selectedVacancy?.country}</span></div>
                            <div className="flex "> <span className="text-xl font-bold"></span></div>
                            <div>Описание: {selectedVacancy?.work_descr}</div>
                            <div className="flex "><Coins />Зарплата: {selectedVacancy?.salary}</div>
                            <div className="flex "><Coins />Проживание:{selectedVacancy?.homePrice}</div>
                            <VacancyButton city={selectedVacancy.city} profession={selectedVacancy.title || ""} slug={selectedVacancy.slug || ""} />
                        </div>
                    </div></>
            )}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
