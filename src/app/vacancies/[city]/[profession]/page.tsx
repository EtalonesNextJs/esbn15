// import { Metadata, ResolvingMetadata } from "next";

// interface Props {
//   params: {
//     city: string;
//     profession: string;
//   };
// }

// async function fetchVacanciesByTitle(city: string, title: string) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/vacancy/by-title?city=${encodeURIComponent(city)}&title=${encodeURIComponent(title)}`,
//     { cache: 'no-store' } // чтоб всегда свежие данные
//   );

//   if (!res.ok) return null;
//   return res.json();
// }
// async function fetchSimilarVacanciesByTitle(title: string) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancy/by-title?title=${encodeURIComponent(title)}`,
//     { cache: 'no-store' }
//   );

//   if (!res.ok) return [];
//   return res.json();
// }

// export async function generateMetadata(
//   { params }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const { city, profession } = await params;

//   const decodedCity = decodeURIComponent(city);
//   const decodedProfession = decodeURIComponent(profession);

//   const vacancies = await fetchVacanciesByTitle(decodedCity, decodedProfession);

//   if (!vacancies || vacancies.length === 0) {
//     return {
//       title: `Вакансии ${decodedProfession} в ${decodedCity} не найдены`,
//       description: `К сожалению, мы не нашли вакансий по профессии ${decodedProfession} в городе ${decodedCity}.`,
//       robots: {
//         index: false,
//         follow: false,
//       },
//     };
//   }

//   const keywordsSet = new Set<string>();
//   let imageFB: string | undefined;

//   vacancies.forEach((v: any) => {
//     if (v.skills) {
//       v.skills.split(',').forEach((s: string) => keywordsSet.add(s.trim()));
//     }
//     if (!imageFB && v.imageFB) imageFB = v.imageFB;
//   });

//   const url = `https://etalones.com/vacancies/${encodeURIComponent(decodedCity)}/${encodeURIComponent(decodedProfession)}`;
//   const description = `Свежие вакансии по профессии ${decodedProfession} в городе ${decodedCity}. Условия труда, зарплаты и условия проживания. Легальное трудоустройство в Европе.`;
//   const keywords = [...keywordsSet, decodedProfession, decodedCity, 'вакансия', 'работа за границей', 'трудоустройство'].join(', ');

//   return {
//     title: `${decodedProfession} в ${decodedCity} – Вакансии | Etalones`,
//     description,
//     keywords,
//     openGraph: {
//       title: `${decodedProfession} в ${decodedCity} – Вакансии`,
//       description,
//       type: "website",
//       url,
//       locale: "ru_RU",
//       images: imageFB ? [imageFB] : undefined,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: `${decodedProfession} в ${decodedCity} – Вакансии`,
//       description,
//       images: imageFB ? [imageFB] : undefined,
//     },
//     alternates: {
//       canonical: url,
//     },
//     robots: {
//       index: true,
//       follow: true,
//     },
//   };
// }

// export default async function VacancyProfessionPage({ params }: Props) {
//   const city = decodeURIComponent(params.city);
//   const profession = decodeURIComponent(params.profession);

//    const vacancies = await fetchVacanciesByTitle(city, profession) || [];

//   // Похожие вакансии (могут быть из других городов)
//   const similarVacancies = await fetchSimilarVacanciesByTitle(profession);
//   // Убираем дубликаты (если нужно)
//   const filteredSimilar = similarVacancies.filter(
//     (v: any) => v.city !== city || !vacancies.some((cur: any) => cur._id === v._id)
//   );



//   return (
//     <div>
//       {/* <h1>Вакансии {profession} в {city}</h1>

//       {vacancies.length === 0 && <p>Вакансии не найдены.</p>}
//       {vacancies.map((vacancy: any) => (
//         <div key={vacancy._id}>
//           <h2>{vacancy.title}</h2>
//           <p>{vacancy.work_descr}</p>
//           <p>Зарплата: {vacancy.salary}</p>
//         </div>
//       ))}

//       <hr className="my-8" /> */}

//       <h2 className="text-xl font-semibold mb-2">Похожие вакансии:</h2>
//       {filteredSimilar.length === 0 ? (
//         <p>Похожих вакансий не найдено.</p>
//       ) : (
//         <ul className="space-y-3">
//           {filteredSimilar.map((v: any) => (
//             <li key={v._id} className="p-3 bg-gray-100 rounded-md">
//               <strong>{v.city}</strong>: {v.title} – {v.salary}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{
    city: string;
    profession: string;
  }>;
};

// API-запросы
async function fetchVacanciesByTitle(city: string, title: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/vacancy/by-title?city=${encodeURIComponent(city)}&title=${encodeURIComponent(title)}`,
    { cache: 'no-store' }
  );
  if (!res.ok) return null;
  return res.json();
}

// Метаданные
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { city, profession } = await params;

  const decodedCity = decodeURIComponent(city);
  const decodedProfession = decodeURIComponent(profession);

  const vacancies = await fetchVacanciesByTitle(decodedCity, decodedProfession);

  if (!vacancies || vacancies.length === 0) {
    return {
      title: `Вакансии ${decodedProfession} в ${decodedCity} не найдены`,
      description: `К сожалению, мы не нашли вакансий по профессии ${decodedProfession} в городе ${decodedCity}.`,
      robots: { index: false, follow: false },
    };
  }

  const keywordsSet = new Set<string>();
  let imageFB: string | undefined;

  vacancies.forEach((v: any) => {
    if (v.skills) {
      v.skills.split(',').forEach((s: string) => keywordsSet.add(s.trim()));
    }
    if (!imageFB && v.imageFB) imageFB = v.imageFB;
  });

  const url = `https://etalones.com/vacancies/${encodeURIComponent(decodedCity)}/${encodeURIComponent(decodedProfession)}`;
  const description = `Свежие вакансии по профессии ${decodedProfession} в городе ${decodedCity}. Условия труда, зарплаты и условия проживания. Легальное трудоустройство в Европе.`;
  const keywords = [...keywordsSet, decodedProfession, decodedCity, 'вакансия', 'работа за границей', 'трудоустройство'].join(', ');

  return {
    title: `${decodedProfession} в ${decodedCity} – Вакансии | Etalones`,
    description,
    keywords,
    openGraph: {
      title: `${decodedProfession} в ${decodedCity} – Вакансии`,
      description,
      type: "website",
      url,
      locale: "ru_RU",
      images: imageFB ? [imageFB] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${decodedProfession} в ${decodedCity} – Вакансии`,
      description,
      images: imageFB ? [imageFB] : undefined,
    },
    alternates: {
      canonical: url,
    },
    robots: { index: true, follow: true },
  };
}

// Компонент страницы
export default async function VacancyProfessionPage({ params }: { params: Promise<{ city: string; profession: string }> }) {
  const { city, profession } = await params;

  const decodedCity = decodeURIComponent(city);
  const decodedProfession = decodeURIComponent(profession);

  const vacancies = await fetchVacanciesByTitle(decodedCity, decodedProfession) || [];

  

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Похожие вакансии {decodedProfession} в других городах</h1>

      {vacancies.length === 0 ? (
        <p>Вакансии не найдены.</p>
      ) : (
        <ul className="space-y-4">
          {vacancies.map((vacancy: any) => (
            <li key={vacancy._id} className="bg-gray-100 p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{vacancy.title}</h2>
              <p dangerouslySetInnerHTML={{ __html: vacancy.work_descr }} />
              <p><strong>Зарплата:</strong> {vacancy.salary}</p>
            </li>
          ))}
        </ul>
      )}

      <hr className="my-8" />

     
    </div>
  );
}
