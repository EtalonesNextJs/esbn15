// 'use client';
// import VacancyCard from "@/components/Vacancy/VacancyCard/VacancyCard";
// import { VacancyType } from "@/lib/types/vacancy";
// import { useEffect, useState } from "react";

// export default function VacancyList({ type, limit }: { type: string; limit?: number }) {
//   const [vacancies, setVacancies] = useState<VacancyType[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const url = `/api/vacancy/all?type=${type}${limit ? `&limit=${limit}` : ""}`;
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error('Failed to fetch vacancy');
//         }

//         const data: VacancyType[] = await response.json();
//         setVacancies(data); // Сохраняем вакансии в состоянии
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, [type, limit]); // Зависимость от типа вакансии и лимита

//   return (
//     <div className="min-h-screen flex items-center justify-center ">
//     <div className="w-full">
//       <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 max-w-md sm:max-w-screen-md lg:max-w-screen-lg w-full mx-auto px-6">
//         {vacancies.map((vacancy: VacancyType, index: number) => (
//           <div key={index}>
//               <VacancyCard vacancy={vacancy} />
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { VacancyType } from '@/lib/types/vacancy'; // Убедись, что VacancyType правильный
import VacancyCard from '../VacancyCard/VacancyCard';

export default function VacancyList({ type, limit }: { type: string; limit?: number }) {
  const [vacancies, setVacancies] = useState<VacancyType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/api/vacancy/all?type=${type}${limit ? `&limit=${limit}` : ""}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch vacancy');
        }

        const data: VacancyType[] = await response.json();
        setVacancies(data); // Сохраняем вакансии в состоянии
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [type, limit]); // Зависимость от типа вакансии и лимита

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const cachedVacancies = localStorage.getItem('vacancies');
        if (cachedVacancies) {
          const parsed = JSON.parse(cachedVacancies);
          if (parsed && Array.isArray(parsed)) {
            setVacancies(parsed); // Устанавливаем вакансии из localStorage
          }
        }
      } catch (error) {
        console.error('Ошибка чтения из localStorage:', error);
      }
    }
  }, []); // Загружаем вакансии только один раз при монтировании

  // Сохранение вакансий в localStorage при изменении
  useEffect(() => {
    if (vacancies.length > 0 && typeof window !== 'undefined') {
      try {
        localStorage.setItem('vacancies', JSON.stringify(vacancies));
      } catch (error) {
        console.error('Ошибка записи в localStorage:', error);
      }
    }
  }, [vacancies]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full">
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 max-w-md sm:max-w-screen-md lg:max-w-screen-lg w-full mx-auto px-6">
          {vacancies.map((vacancy, index) => (
            <div key={vacancy._id || index}> {/* Используем _id или индекс для key */}
              <VacancyCard vacancy={vacancy} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
