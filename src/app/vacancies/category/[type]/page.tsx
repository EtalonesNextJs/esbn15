// app/vacancies/category/[type]/page.tsx
import VacancyCard from '@/components/Vacancy/VacancyCard/VacancyCard';
import FormCallBack from '@/components/FormCallBack/FormCallBack';
import Userfull from '@/components/Userfull/Userfull';
import { VacancyType } from '@/lib/types/vacancy';
import { notFound } from 'next/navigation';

interface Params {
  params: {
    type: string;
  };
}

export const dynamic = 'force-dynamic'; // отключаем кэширование

const translateType = (type: string) => {
  switch (type) {
    case 'all':
      return 'Все вакансии';
    case 'new':
      return 'Новые вакансии';
    case 'indor':
      return 'Внутренняя отделка';
    case 'outdor':
      return 'Уличные работы';
    case 'electric':
      return 'Электрика';
    case 'sanitary':
      return 'Сантехника';
    default:
      return null;
  }
};

export default async function VacancyCategoryPage({ params }: Params) {
  const type = params.type;

  const title = translateType(type);

  if (!title) {
    notFound(); // если тип неизвестен — показываем 404
  }

  // Используем универсальный API эндпоинт, адаптируй под новый бекенд
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancy/${type}`, {
    cache: 'no-store', // или ISR, если нужно
  });

  if (!res.ok) {
    return (
      <div>
        <h1>{title}</h1>
        <p>Не удалось загрузить вакансии. Попробуйте позже.</p>
      </div>
    );
  }

  const vacancies: VacancyType[] = await res.json();

  return (
    <>
      <h1 className="text-center text-3xl font-bold my-5">{title}</h1>
      {vacancies.length === 0 ? (
        <p className="text-center">Нет доступных вакансий.</p>
      ) : (
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 max-w-md sm:max-w-screen-md lg:max-w-screen-lg w-full mx-auto px-6">
          {vacancies.map((vacancy) => (
            <VacancyCard key={vacancy._id} vacancy={vacancy} />
          ))}
        </div>
      )}
      <FormCallBack />
      <Userfull />
    </>
  );
}
