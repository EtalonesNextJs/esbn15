import { notFound } from 'next/navigation';
import VacancysPage from '@/components/VacancysPage/VacancysPage';

interface PageProps {
  params: { 
    page: string,
    profession: string,
    country: string,
   };
  searchParams?: { [key: string]: string | undefined };
}

export default function Page({ params, searchParams = {} }: PageProps) {
  const currentPage = parseInt(params.page, 10);
  if (isNaN(currentPage) || currentPage < 1) return notFound();
 const filters = {
    profession: params.profession,
    country: params.country,
  };
  // Передаём searchParams в VacancysPage, если не передан — передаём пустой объект
  return <VacancysPage currentPage={currentPage} profession={filters.profession} country={filters.country} searchParams={searchParams} />;
}
