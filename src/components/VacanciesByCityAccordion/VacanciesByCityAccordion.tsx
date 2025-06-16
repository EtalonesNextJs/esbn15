"use client";

import React, { memo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import VacancyCard from "../Vacancy/VacancyCard/VacancyCard";

interface VacancyType {
  _id: string;
  title: string;
  city: string;
  // ...другие поля вакансии
}

interface GroupedVacanciesProps {
  groupedVacancies: {
    city: string;
    vacancies: VacancyType[];
  }[];
}

const VacanciesByCityAccordion: React.FC<GroupedVacanciesProps> = ({
  groupedVacancies,
}) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {groupedVacancies.length === 0 && (
        <p className="text-center py-10 text-muted-foreground">Вакансии не найдены</p>
      )}
      {groupedVacancies.map(({ city, vacancies }) => (
        <AccordionItem key={city} value={city} className="border-b">
          <AccordionTrigger className="text-lg font-semibold">{city || "Без города"}</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {vacancies.map((vacancy) => (
                <VacancyCard key={vacancy._id} vacancy={vacancy} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default memo(VacanciesByCityAccordion);
