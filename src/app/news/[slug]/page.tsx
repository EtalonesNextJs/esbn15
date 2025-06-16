import NewsPage from '@/components/News/NewsPage/NewsPage';



const getNewsById = async (id: string) => {
  const url = `https://etalones.com/api/news/${id}`;

  try {
    const res = await fetch(url, {
      cache: "no-store", // Отключаем кеширование для свежих данных
    });

    if (!res.ok) {
      console.error(`Ошибка при загрузке новостей, статус: ${res.status}`);
      throw new Error("Не удалось загрузить новости");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Ошибка при получении новостей:', error);
    return null; // Возвращаем null в случае ошибки
  }
};

export default async function NewsDetailsPage({ params }: any) {
  // Ждем, пока params загрузятся
  const { id } =  params;

  const data = await getNewsById(id);

  if (!data || !data.news) {
    return <div>Ошибка при загрузке данных новостей</div>;
  }

  const { news } = data;
  return <NewsPage news={news} />;
}

// import React from 'react';
// import Image from 'next/image';
// // import Breadcrumbs from '@/ui/Breadcrumbs/Breadcrumbs';
// import FormCallBack from '@/components/FormCallBack/FormCallBack';
// // import ManagerCard from '../ManagerCard/ManagerCard';
// // import CardNews from '../CardNews/CardNews';
// import convertLinks from '@/utils/convertLinks';
// import Userfull from '@/components/Userfull/Userfull';
// import NewsPage from '@/components/News/NewsPage/NewsPage';

// const getNewsById = async (id: any) => {
//     const url = `/api/news/${id}`;


//     try {
//         const res = await fetch(url, {
//             cache: "no-store",
//         });

//         if (!res.ok) {
//             console.error(`Failed to fetch news, status: ${res.status}`);
//             throw new Error("Failed to fetch news");
//         }

//         const data = await res.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching news:', error); // Лог ошибки
//         return null; // Возвращаем null в случае ошибки
//     }
// };
// const Page = async ( id  ) => {
//     const data = await getNewsById(id);

//     if (!data || !data.news) {
//         // Обработка случая, когда данные не были получены
//         return <div>Error loading News data</div>;
//     }

//     const { news } = data;
//     return (
//         <>
//             <NewsPage news={news} />
           
//         </>
//     );
// };

// export default Page;

// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import NewsCard from '@/components/News/NewsCard/NewsCard';

// export default function VacancyList() {
//   const [news, setNews] = useState<any[]>([]);
//   const params = useParams(); 
//   const type = params?.type || 'all'; 

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`/api/news/all?type=${type}`);
//         if (!response.ok) throw new Error('Не удалось загрузить вакансии');

//         const data = await response.json();
//         setNews(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, [type]);

//   const translateType = (type: any) => {
//     switch (type) {
//       case 'all':
//         return 'Все вакансии';
//       case 'new':
//         return 'Новые вакансии';
//       case 'recruiter':
//         return 'Вакансии рекрутера';
//       case 'manager':
//         return 'Вакансии менеджера';
//       case 'candidate':
//         return 'Вакансии кандидата';
//       default:
//         return 'Неизвестный тип';
//     }
//   };

//   return (
//     <>
//       <h1 className='text-center text-3xl font-bold'>{translateType(type)}</h1>
//       <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 max-w-md sm:max-w-screen-md lg:max-w-screen-lg w-full mx-auto px-6">
//         {news.map((news: any, index: number) => (
//           <NewsCard key={index} news={news} />
//         ))}
//       </div>
//     </>
//   );
// }
