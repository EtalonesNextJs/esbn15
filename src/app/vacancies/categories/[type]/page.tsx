// // app/vacancies/category/[type]/page.tsx
// import VacancyCard from '@/components/Vacancy/VacancyCard/VacancyCard';
// import FormCallBack from '@/components/FormCallBack/FormCallBack';
// import Userfull from '@/components/Userfull/Userfull';
// import { VacancyType } from '@/lib/types/vacancy';
// import { notFound } from 'next/navigation';


// const translateType = (type: string) => {
//   switch (type) {
//     case 'noexp':
//       return 'Без опыта';
//     case 'kamen':
//       return 'Каменьщики';
//     case 'indor':
//       return 'Внутренняя отделка';
//     case 'krovlya':
//       return 'Кровля';
//     case 'electric':
//       return 'Электрика';
//     case 'beton':
//       return 'Бетон/Арматура';
//     case 'santehnic':
//       return 'Сантехника';
//     case 'montazj':
//       return 'Монтажники';
//     case 'tehnic':
//       return 'Техника';
//     default:
//       return null;
//   }
// };

// export default async function VacancyCategoryPage({ params }: { params: { type: string } }) {
//   const { type } = await params;

//   const title = translateType(type);

//   if (!title) {
//     console.log("VacancyCategoryPage not found");
//     notFound(); 
//   }

//   // Используем универсальный API эндпоинт, адаптируй под новый бекенд
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancies/categories/${type}`, {
//     cache: 'no-store', // или ISR, если нужно
//   });

//   if (!res.ok) {
//     return (
//       <div>
//         <h1>{title}</h1>
//         <p>Не удалось загрузить вакансии. Попробуйте позже.</p>
//       </div>
//     );
//   }

//   const vacancies: VacancyType[] = await res.json();

//   return (
//     <>
//       <h1 className="text-center text-3xl font-bold my-5">{title}</h1>
//       {vacancies.length === 0 ? (
//         <p className="text-center">Нет доступных вакансий.</p>
//       ) : (
//         <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 max-w-md sm:max-w-screen-md lg:max-w-screen-lg w-full mx-auto px-6">
//           {vacancies.map((vacancy) => (
//             <VacancyCard key={vacancy._id} vacancy={vacancy} />
//           ))}
//         </div>
//       )}
//       <FormCallBack />
//       <Userfull />
//     </>
//   );
// }
import VacancyCard from '@/components/Vacancy/VacancyCard/VacancyCard';
import FormCallBack from '@/components/FormCallBack/FormCallBack';
import Userfull from '@/components/Userfull/Userfull';
import { VacancyType } from '@/lib/types/vacancy';
import { notFound } from 'next/navigation';
import { formatLabel } from '@/lib/labels';



async function getVacanciesByType(type: string): Promise<VacancyType[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancies/categories/${type}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch vacancies');
  }
  return res.json();
}

export default async function VacancyCategoryPage({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const { type } = await params;

  const title = (formatLabel(type));
  if (!title) {
    notFound();
  }

  let vacancies: VacancyType[] = [];
  try {
    vacancies = await getVacanciesByType(type);
  } catch {
    return (
      <>
        <h1 className="text-center text-3xl font-bold my-5">{title}</h1>
        <p className="text-center">Не удалось загрузить вакансии. Попробуйте позже.</p>
      </>
    );
  }

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

