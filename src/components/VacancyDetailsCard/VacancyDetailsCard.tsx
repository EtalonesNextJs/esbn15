// components/VacancyDetailsCard.tsx
"use client";
import { VacancyType } from "@/lib/types/vacancy";
import { VacancyButton } from "../VacancyButton/VacancyButton";
import CountUp from "../CountUp/CountUp";
import { parseSalary } from "@/utils/parse-salary";

type Props = {
  vacancy: VacancyType;
};

export const VacancyDetailsCard = ({ vacancy }: Props) => {
  if (!vacancy) return null;

  return (
    <><div className="grid md:grid-cols-3 gap-2 w-full">
          <div className="rounded-md border border-gray-300 bg-white p-2 shadow-sm relative">
              <p className="absolute top-1 left-1 text-sm text-gray-600">Заработная плата:</p>
              <div className="flex gap-2 justify-end items-center">
              <CountUp
                  key={vacancy.slug || vacancy.salary} // <--- ключ для перерисовки
                  from={0}
                  to={parseSalary(vacancy.salary)}
                  separator=","
                  direction="up"
                  duration={1.5}
                  className="count-up-text text-xl font-bold " />
                  EUR/час
                  </div>
                  
          </div>
          <div className="rounded-md border border-gray-300 bg-white p-2 shadow-sm relative">
              <p className="absolute top-1 left-1 text-sm text-gray-600">Проживание:</p>
              <div className="flex gap-2 justify-end items-center">
                  <CountUp
                      key={vacancy.slug || vacancy.homePrice} // <--- ключ для перерисовки
                      from={0}
                      to={parseSalary(vacancy.homePrice)}
                      separator=","
                      direction="up"
                      duration={1.5}
                      className="count-up-text text-xl font-bold" /> EUR
              </div>
          </div>
          <div className="rounded-md border border-gray-300 bg-white p-2 shadow-sm relative">
              <p className="absolute top-1 left-1 text-sm text-gray-600">
                  Средняя зарплата:
              </p>
              <div className="flex gap-2 justify-end items-center">
                  <CountUp
                      key={vacancy.slug || vacancy.avSalary} // <--- ключ для перерисовки
                      from={0}
                      to={parseSalary(vacancy.avSalary)}
                      separator=","
                      direction="up"
                      duration={1.5}
                      className="count-up-text text-xl font-bold" />
                      EUR
              </div>
          </div>
      </div>
      <div className="flex flex-col gap-2 text-muted-foreground line-clamp-3 text-ellipsis bg-gray-100 rounded-lg p-5 mt-5">
              <div className="flex justify-between items-end">
                  <span className="text-2xl font-semibold tracking-tight">Вакансия {vacancy.title} в городе {vacancy.city}, {vacancy.country}</span>
               <div
  
  className={`flex items-center gap-3 rounded border px-3 py-1 ${
    vacancy.status === "open" ? "border-green-400" : "border-yellow-400"
  }`}
>
  <span className="relative flex size-2">
    {vacancy.status === "open" ? (
      <>
        <span className="absolute flex size-full animate-ping rounded-full bg-green-400 opacity-75"></span>
        <span className="relative flex size-2 rounded-full bg-green-400"></span>
      </>
    ) : (
      <>
        <span className="absolute flex size-full animate-pulse rounded-full bg-yellow-400 opacity-75"></span>
        <span className="relative flex size-2 rounded-full bg-yellow-400"></span>
      </>
    )}
  </span>
  <span className="font-mono text-sm">
    {vacancy.status === "open" ? "Набор открыт!" : "Набор приостановлен"}
  </span>
</div>
              </div>
              <ul className="list-disc flex flex-col gap-2 text-muted-foreground line-clamp-3 text-ellipsis bg-gray-100 rounded-lg p-5 ">
              <li>Навыки: {vacancy.roof_type?.replace(/<[^>]*>/g, '').slice(0, 160)}</li>
              <li>
                Описание:
                {vacancy.work_descr?.split(';').map((item: string, index: number) => (
                  <div key={index}>
                    {item}
                  </div>
                ))}
              </li>

              <li> Зарплата: {vacancy.salary}</li>
              <li>
                Быт:
                {vacancy.home_descr?.split(';').map((item: string, index: number) => (
                  <div key={index}>
                    {item}
                  </div>
                ))}
              </li>
              <li> Стоимость проживания: {vacancy.homePrice}</li>
              </ul>
              <VacancyButton title={vacancy.title || ""} city={vacancy.city || ""} profession={vacancy.profession || ""} slug={vacancy.slug || ""}  />
          </div></>
  );
};
