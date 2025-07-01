'use client';

import { VacancyType } from "@/lib/types/vacancy";
import { Marquee } from "@/components/magicui/marquee";
import { Button } from "../ui/button";
import VacancyCard from "@/components/VacancyCard/VacancyCard"; // вынесен отдельно
import Link from "next/link";

export function MyMarquee({ vacancies }: { vacancies: VacancyType[] }) {
  const firstRow = vacancies.slice(0, vacancies.length / 2);
  const secondRow = vacancies.slice(vacancies.length / 2);

  return (
    <>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((vacancy, index) => (
            <VacancyCard key={index} vacancy={vacancy} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((vacancy, index) => (
            <VacancyCard key={index} vacancy={vacancy} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
      <Button type="button" className="flex justify-center my-2 mx-auto">
        <Link className="text-white" href="/vacancies">
          Показать все
        </Link>
      </Button>
    </>
  );
}
