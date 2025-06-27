// // components/VacancyTabs/VacancyContentPanel.tsx
"use client";

import { TabsContent } from "@/components/ui/tabs";
import VacanciesByCityAccordion from "@/components/VacancyGrouped/VacanciesByCityAccordion";
import { VacancyDetailsCard } from "../VacancyDetailsCard/VacancyDetailsCard";
import { VacancyType } from "@/lib/types/vacancy";
import React from "react";

type Props = {
  cities: string[];
  activeCity: string;
  grouped: Record<string, VacancyType[]>;
  selectedVacancy: VacancyType | null;
  onVacancySelect: (vac: VacancyType | null) => void;
  initialSlug: string;
  showFilters?: boolean;
};
// function generateSeoText(
//   city: string,
//   vacancies: VacancyType[],
//   onVacancySelect: (vac: VacancyType) => void
// ) {
//   if (!vacancies || vacancies.length === 0) return null;

//   const uniqueVacanciesMap = new Map<string, VacancyType>();
//   vacancies.forEach((v) => {
//     if (!uniqueVacanciesMap.has(v.title)) {
//       uniqueVacanciesMap.set(v.title, v);
//     }
//   });
//   const uniqueVacancies = Array.from(uniqueVacanciesMap.values());

//   const professionsWithLinks = uniqueVacancies.map((vacancy, i) => (
//     <React.Fragment key={vacancy._id || vacancy.slug}>
//       <a
//         href="#"
//         onClick={(e) => {
//           e.preventDefault();
//           onVacancySelect(vacancy);
//         }}
//         className="text-blue-600 underline hover:text-blue-800"
//       >
//         {vacancy.title.toLowerCase()}
//       </a>
//       {i < uniqueVacancies.length - 1 ? ", " : ""}
//     </React.Fragment>
//   ));

//   return (
//     <div className="seo-text p-6 mb-6 bg-white rounded-md shadow text-gray-700 leading-relaxed">
//       <h2 className="text-2xl font-semibold mb-4">
//         Работа и вакансии во {city}: свежие предложения для специалистов
//       </h2>
//       <p>
//         Ищете <strong>работу во {city}</strong> или актуальные <strong>вакансии во {city}</strong>? Наш портал предлагает широкий выбор
//         предложений для квалифицированных специалистов и начинающих сотрудников.
//       </p>
//       <p>
//         Во {city} востребованы специалисты разных направлений — обратите внимание на профессии: {professionsWithLinks}. Здесь вы найдете
//         работу по специальности, соответствующую вашим навыкам и опыту.
//       </p>
//       <p>
//         Мы собрали для вас самые свежие и актуальные вакансии, которые регулярно обновляются. Независимо от того, ищете ли вы работу монтажником,
//         электриком, кровельщиком или мастером универсалом — во {city} найдется подходящее предложение.
//       </p>
//       <p>
//         Ознакомьтесь с доступными вариантами трудоустройства, отправьте заявку и начните строить успешную карьеру уже сегодня!
//       </p>
//       <p className="mt-4 text-sm text-gray-500">
//         Используйте данный раздел для поиска работы, вакансий, трудоустройства и карьерных возможностей во {city}.
//       </p>
//     </div>
//   );
// }

function generateSeoText(
  city: string,
  vacancies: VacancyType[],
  onVacancySelect: (vac: VacancyType) => void
) {
  if (!vacancies || vacancies.length === 0) return null;

  const uniqueTitles = Array.from(new Set(vacancies.map(v => v.title)));

  const professionLinks = uniqueTitles.map((title, i) => {
    const vacancy = vacancies.find(v => v.title === title)!;
    return (
      <React.Fragment key={vacancy._id || vacancy.slug}>
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            onVacancySelect(vacancy);
          }}
          className="text-blue-600 underline hover:text-blue-800"
        >
          {(title ?? "").toLowerCase()}
        </a>
        {i < uniqueTitles.length - 1 ? ', ' : '.'}
      </React.Fragment>
    );
  });

  return (
    <div className="seo-text p-6 mb-6 bg-white rounded-md shadow text-gray-700 leading-relaxed">
      <h2 className="text-2xl font-semibold mb-4">Работа и вакансии в {city}</h2>

      <p>
        Ищете <strong>работу в {city}</strong> или актуальные <strong>вакансии</strong>? Мы собрали предложения для специалистов в таких профессиях, как {professionLinks}
      </p>

      <p>
        Здесь вы можете найти работу для <strong>{uniqueTitles.length === 1 ? (uniqueTitles[0]?.toLowerCase() ?? "") : 'разных специалистов'}</strong> в {city} и отправить заявку на подходящую вакансию.
      </p>

      <p>
        Etalones помогает быстро найти работу, вакансии и трудоустройство в Герамии в частности {city} по востребованным профессиям с актуальными условиями и требованиями.
      </p>

      <p className="mt-4 text-sm text-gray-500">
        Найдите работу мечты в {city} — свежие вакансии и удобный поиск на нашем портале.
      </p>
    </div>
  );
}


export const VacancyContentPanel = ({
  cities,
  activeCity,
  grouped,
  selectedVacancy,
  onVacancySelect,
  initialSlug,
  showFilters = true, // по умолчанию true
}: Props) => {
  return (
    <div className="md:col-span-3 ">
      {cities.map((city) => (
        <TabsContent key={city} value={city}>
          {showFilters && (
            <>
          {/* Аккордеон всегда показываем */}
          <VacanciesByCityAccordion
            city={city}
            vacancies={grouped[city]}
            onVacancySelect={onVacancySelect}
            initialSlug={initialSlug}
          />

          {/* Остальной контент — только если showFilters включён */}
              {selectedVacancy && selectedVacancy.city === city ? (
                <VacancyDetailsCard vacancy={selectedVacancy} />
              ) : (
                <div className="text-muted-foreground p-6 bg-gray-100 rounded-md text-center space-y-2">
                  <p className="mb-4">Перейдите по ссылке на страницу вакансии:</p>

                    <div
                      className="  block"
                    >
{generateSeoText(city, grouped[city], onVacancySelect)}
                      {/* {vacancy.title} */}
                    </div>
                </div>
              )}
            </>
          )}
        </TabsContent>
      ))}
    </div>
  );
};
