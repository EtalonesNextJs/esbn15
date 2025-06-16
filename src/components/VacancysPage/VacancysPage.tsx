import { getVacancies } from "@/lib/api/api";
import VacancyCard from "../Vacancy/VacancyCard/VacancyCard";
import FormCallBack from "../FormCallBack/FormCallBack";
import Userfull from "../Userfull/Userfull";
import { Breadcrumbs } from "../breadcrumbs/Breadcrumbs";
import { PaginationNavigation } from "../PaginationNavigation/PaginationNavigation";
import { VacancyType } from "@/lib/types/vacancy";
import VacancyFilter from "../Vacancy/VacancyFilter/VacancyFilter";

interface Props {
  currentPage: number;
  profession: string;
  country: string;
  searchParams: { [key: string]: string | undefined };
}

const LIMIT = 10;

export default async function VacancysPage({ currentPage, profession, country, searchParams }: Props) {
  const offset = (currentPage - 1) * LIMIT;

  const filters = {
    profession,
    country,
    city: searchParams.city,
    urgently: searchParams.urgently === "true" ? true : undefined,
    last: searchParams.last === "true" ? true : undefined,
    // Добавь остальные фильтры, если нужно
  };

  const { vacancies, total } = await getVacancies(profession, offset, LIMIT, filters);
  const totalPages = Math.ceil(total / LIMIT);
  return (
    <>
      <h1 className="text-center text-3xl font-bold">Вакансии</h1>

      <div className="w-full max-w-screen-md mx-auto p-5">
        <Breadcrumbs />
      </div>

      <PaginationNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/vacancies/${profession}/${country}`} // база под новую структуру маршрутов
      />

      <div className="grid grid-cols-4 gap-4">
        {/* Передаем текущие дополнительные фильтры (например, city) */}
        <VacancyFilter currentFilters={searchParams} />

        <div className="mt-10 col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 max-w-md sm:max-w-screen-md lg:max-w-screen-lg w-full mx-auto px-6">
          {vacancies?.map((vacancy: VacancyType, index: number) => (
            <VacancyCard key={index} vacancy={vacancy} />
          ))}
        </div>
      </div>

      <PaginationNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/vacancies/${profession}/${country}`}
      />

      <FormCallBack />
      <Userfull />
    </>
  );
}
