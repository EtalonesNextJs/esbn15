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
    <div className="md:col-span-3">
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
  <div className="text-muted-foreground p-6 bg-gray-100 rounded-md text-center space-y-2">
    <p className="mb-4">Выберите вакансию из списка:</p>

    {grouped[city].map((vacancy) => (
      <button
        key={vacancy._id || vacancy.slug}
        onClick={() => onVacancySelect(vacancy)}
        className="underline text-blue-600 hover:text-blue-800 block"
      >
        {vacancy.title}
      </button>
    ))}
  </div>
)}

        </TabsContent>
      ))}
    </div>
  );
};
