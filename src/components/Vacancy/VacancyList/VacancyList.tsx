// components/Vacancy/VacancyList/VacancyList.tsx
import VacancyCard from "@/components/Vacancy/VacancyCard/VacancyCard";
import { VacancyType } from "@/lib/types/vacancy";

interface VacancyListProps {
  profession: string;
  country?: string;
  city?: string;
  limit?: number;
}

export default async function VacancyList({ profession, country, city, limit = 9 }: VacancyListProps) {
  const params = new URLSearchParams({ profession });
  if (country) params.append("country", country);
  if (city) params.append("city", city);
  if (limit) params.append("limit", limit.toString());

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/vacancies-by-profession?${params.toString()}`, {
    cache: "no-store", // можно заменить на revalidate: 60 для ISR
  });

  if (!res.ok) {
    console.error("Failed to fetch vacancies");
    return <div className="text-center text-red-500">Ошибка загрузки вакансий</div>;
  }

  const { vacancies }: { vacancies: VacancyType[] } = await res.json();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full">
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 max-w-md sm:max-w-screen-md lg:max-w-screen-lg w-full mx-auto px-6">
          {vacancies.length > 0 ? (
            vacancies.map((vacancy) => (
              <div key={vacancy._id}>
                <VacancyCard vacancy={vacancy} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">Нет вакансий</div>
          )}
        </div>
      </div>
    </div>
  );
}

// 'use client';

// import { useState, useEffect } from 'react';
// import { VacancyType } from '@/lib/types/vacancy'; // Убедись, что VacancyType правильный
// import VacancyCard from '../VacancyCard/VacancyCard';

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

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       try {
//         const cachedVacancies = localStorage.getItem('vacancies');
//         if (cachedVacancies) {
//           const parsed = JSON.parse(cachedVacancies);
//           if (parsed && Array.isArray(parsed)) {
//             setVacancies(parsed); // Устанавливаем вакансии из localStorage
//           }
//         }
//       } catch (error) {
//         console.error('Ошибка чтения из localStorage:', error);
//       }
//     }
//   }, []); // Загружаем вакансии только один раз при монтировании

//   // Сохранение вакансий в localStorage при изменении
//   useEffect(() => {
//     if (vacancies.length > 0 && typeof window !== 'undefined') {
//       try {
//         localStorage.setItem('vacancies', JSON.stringify(vacancies));
//       } catch (error) {
//         console.error('Ошибка записи в localStorage:', error);
//       }
//     }
//   }, [vacancies]);

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="w-full">
//         <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 max-w-md sm:max-w-screen-md lg:max-w-screen-lg w-full mx-auto px-6">
//           {vacancies.map((vacancy, index) => (
//             <div key={vacancy._id || index}> {/* Используем _id или индекс для key */}
//               <VacancyCard vacancy={vacancy} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
