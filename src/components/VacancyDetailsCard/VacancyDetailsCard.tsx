// components/VacancyDetailsCard.tsx
"use client";
import { VacancyType } from "@/lib/types/vacancy";
import { Coins, House } from "lucide-react";
import { VacancyButton } from "../VacancyButton/VacancyButton";

type Props = {
  vacancy: VacancyType;
};

export const VacancyDetailsCard = ({ vacancy }: Props) => {
  if (!vacancy) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      <div className="rounded-md border border-gray-300 bg-white p-2 shadow-sm relative">
        <p className="absolute top-1 left-1 text-sm text-gray-600">Заработная плата:</p>
        <div className="flex gap-2 items-center p-5">
          <span className="text-xl font-bold">{vacancy.salary}</span>
        </div>
      </div>
      <div className="rounded-md border border-gray-300 bg-white p-2 shadow-sm relative">
        <p className="absolute top-1 left-1 text-sm text-gray-600">Проживание:</p>
        <div className="flex gap-2 items-center p-5">
          <span className="text-xl font-bold">{vacancy.homePrice}</span>
        </div>
      </div>
      <div className="rounded-md border border-gray-300 bg-white p-2 shadow-sm relative">
        <p className="absolute top-1 left-1 text-sm text-gray-600">
          Средняя зарплата чистыми:
        </p>
        <div className="flex gap-2 items-center p-5">
          <span className="text-xl font-bold">{vacancy.avSalary} EUR/мес.</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-[17px] leading-relaxed text-muted-foreground bg-gray-100 p-5 rounded-lg col-span-4">
        <div className="flex justify-start items-end">
          <span className="text-xl font-bold">Вакансия {vacancy.title} в городе {vacancy.city}, {vacancy.country}</span>
        </div>
        <div>Навыки: {vacancy.roof_type?.replace(/<[^>]*>/g, '').slice(0, 160)}</div>
        <div>Описание: {vacancy.work_descr}</div>
        <div className="flex items-center gap-2"><Coins /> Зарплата: {vacancy.salary}</div>
        <div>{vacancy.home_descr}</div>
        <div className="flex items-center gap-2"><House /> Стоимость проживания: {vacancy.homePrice}</div>

        <VacancyButton city={vacancy.city || ""} profession={vacancy.title || ""} slug={vacancy.slug || ""} title={vacancy.title || ""} />
      </div>
    </div>
  );
};
