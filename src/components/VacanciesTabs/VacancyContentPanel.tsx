// components/VacancyTabs/VacancyContentPanel.tsx
"use client";

import { TabsContent } from "@/components/ui/tabs";
import VacanciesByCityAccordion from "@/components/VacancyGrouped/VacanciesByCityAccordion";
import { VacancyDetailsCard } from "../VacancyDetailsCard/VacancyDetailsCard";
import { VacancyType } from "@/lib/types/vacancy";

type Props = {
  cities: string[];
  activeCity: string;
  grouped: Record<string, VacancyType[]>;
  selectedVacancy: VacancyType | null;
  onVacancySelect: (vac: VacancyType | null) => void;
  initialSlug: string;
};

export const VacancyContentPanel = ({
  cities,
  activeCity,
  grouped,
  selectedVacancy,
  onVacancySelect,
  initialSlug,
}: Props) => {
  return (
    <div className="col-span-3">
      {cities.map((city) => (
        <TabsContent key={city} value={city}>
          <VacanciesByCityAccordion
            city={city}
            vacancies={grouped[city]}
            onVacancySelect={onVacancySelect}
            initialSlug={initialSlug}
          />
          {selectedVacancy && selectedVacancy.city === city ? (
  <VacancyDetailsCard vacancy={selectedVacancy} />
) : (
  <div className="text-muted-foreground p-6 bg-gray-100 rounded-md text-center">
    <p>Выберите вакансию из списка, чтобы увидеть подробности</p>
  </div>
)}

        </TabsContent>
      ))}
    </div>
  );
};
