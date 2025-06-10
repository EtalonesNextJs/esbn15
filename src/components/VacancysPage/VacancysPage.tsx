'use client';
import React, { useState, useEffect } from "react";
import FormCallBack from "../FormCallBack/FormCallBack";
import Userfull from "../Userfull/Userfull";
import VacancyCard from "../Vacancy/VacancyCard/VacancyCard";
import { getVacancies } from "@/lib/api";
import { Breadcrumbs } from "../breadcrumbs/Breadcrumbs";

export default function VacancysPage() {
  const [vacancys, setVacancys] = useState<any[]>([]);

  useEffect(() => {
    async function fetchVacancies() {
      const data = await getVacancies('all');
      setVacancys(data);
    }
    fetchVacancies();
  }, []);

  return (
      <><h1 className="text-center text-3xl font-bold">Вакансии</h1><div className="w-full max-w-screen-md mx-auto p-5">
          <Breadcrumbs />
      </div><div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 max-w-md sm:max-w-screen-md lg:max-w-screen-lg w-full mx-auto px-6">
              {vacancys?.map((vacancy, index) => (
                  <VacancyCard key={index} vacancy={vacancy} />
              ))}
          </div><FormCallBack /><Userfull /></>
  );
}
