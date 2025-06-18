import { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: {
    city: string;
    profession: string;
  };
}

async function fetchVacanciesByTitle(city: string, title: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/vacancy/by-title?city=${encodeURIComponent(city)}&title=${encodeURIComponent(title)}`,
    { cache: 'no-store' } // чтоб всегда свежие данные
  );

  if (!res.ok) return null;
  return res.json();
}
async function fetchSimilarVacanciesByTitle(title: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancy/by-title?title=${encodeURIComponent(title)}`,
    { cache: 'no-store' }
  );

  if (!res.ok) return [];
  return res.json();
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const city = decodeURIComponent(params.city);
  const profession = decodeURIComponent(params.profession);

  const vacancies = await fetchVacanciesByTitle(city, profession);

  if (!vacancies || vacancies.length === 0) {
    return {
      title: `Вакансии ${profession} в ${city} не найдены`,
      description: `К сожалению, мы не нашли вакансий по профессии ${profession} в городе ${city}.`,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // Собираем ключевые слова и прочее, как и раньше
  const keywordsSet = new Set<string>();
  let imageFB: string | undefined = undefined;

  vacancies.forEach((v: any) => {
    if (v.skills) v.skills.split(',').forEach((s: string) => keywordsSet.add(s.trim()));
    if (!imageFB && v.imageFB) imageFB = v.imageFB;
  });

  const url = `https://etalones.com/vacancies/${encodeURIComponent(city)}/${encodeURIComponent(profession)}`;
  const description = `Свежие вакансии по профессии ${profession} в городе ${city}. Условия труда, зарплаты и условия проживания. Легальное трудоустройство в Европе.`;
  const keywords = [...keywordsSet, profession, city, 'вакансия', 'работа за границей', 'трудоустройство'].join(', ');

  return {
    title: `${profession} в ${city} – Вакансии | Etalones`,
    description,
    keywords,
    openGraph: {
      title: `${profession} в ${city} – Вакансии`,
      description,
      type: "website",
      url,
      locale: "ru_RU",
      images: imageFB ? [imageFB] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${profession} в ${city} – Вакансии`,
      description,
      images: imageFB ? [imageFB] : undefined,
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function VacancyProfessionPage({ params }: Props) {
  const city = decodeURIComponent(params.city);
  const profession = decodeURIComponent(params.profession);

   const vacancies = await fetchVacanciesByTitle(city, profession) || [];

  // Похожие вакансии (могут быть из других городов)
  const similarVacancies = await fetchSimilarVacanciesByTitle(profession);
  // Убираем дубликаты (если нужно)
  const filteredSimilar = similarVacancies.filter(
    (v: any) => v.city !== city || !vacancies.some((cur: any) => cur._id === v._id)
  );



  return (
    <div>
      {/* <h1>Вакансии {profession} в {city}</h1>

      {vacancies.length === 0 && <p>Вакансии не найдены.</p>}
      {vacancies.map((vacancy: any) => (
        <div key={vacancy._id}>
          <h2>{vacancy.title}</h2>
          <p>{vacancy.work_descr}</p>
          <p>Зарплата: {vacancy.salary}</p>
        </div>
      ))}

      <hr className="my-8" /> */}

      <h2 className="text-xl font-semibold mb-2">Похожие вакансии:</h2>
      {filteredSimilar.length === 0 ? (
        <p>Похожих вакансий не найдено.</p>
      ) : (
        <ul className="space-y-3">
          {filteredSimilar.map((v: any) => (
            <li key={v._id} className="p-3 bg-gray-100 rounded-md">
              <strong>{v.city}</strong>: {v.title} – {v.salary}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
