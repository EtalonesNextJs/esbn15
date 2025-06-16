import { notFound } from "next/navigation";
import VacancysPage from "@/components/VacancysPage/VacancysPage";

interface Params {
  profession: string;
  country: string;
}

interface SearchParams {
  page?: string;
}

interface Props {
  params: Params;
  searchParams: SearchParams;
}

export default function VacanciesByProfessionCountry({ params, searchParams }: Props) {
  const currentPage = parseInt(searchParams.page || "1");
  if (isNaN(currentPage) || currentPage < 1) return notFound();

  // Формируем объект фильтров для передачи в компонент
  const filters = {
    profession: params.profession,
    country: params.country,
  };

  return <VacancysPage currentPage={0} profession={filters.profession} country={filters.country} searchParams={{}}  />;
}
