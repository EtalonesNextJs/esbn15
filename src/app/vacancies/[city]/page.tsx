// src/app/vacancies/[city]/page.tsx

import { Metadata, ResolvingMetadata } from "next";


type Props = {
  params: Promise<{
    city: string
    
  }>
}

// Функция для запроса вакансий по городу с твоего API
async function fetchVacanciesByCity(city: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancy/by-city?city=${encodeURIComponent(city)}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { city } = await params;
  const vacancies = await fetchVacanciesByCity(city);

  if (!vacancies || vacancies.length === 0) {
    return {
      title: `Вакансии в городе ${city} не найдены`,
      description: `К сожалению, мы не нашли вакансий в городе ${city}.`,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // Собираем ключевые слова и изображения для SEO
  const keywordsSet = new Set<string>();
  let imageFB: string | undefined = undefined;

  vacancies.forEach((vacancy: any) => {
    if (vacancy.skills) vacancy.skills.split(",").forEach((s: string) => keywordsSet.add(s.trim()));
    if (!imageFB && vacancy.imageFB) imageFB = vacancy.imageFB;
  });

  const url = `https://etalones.com/vacancies/${encodeURIComponent(city)}`;
  const description = `Актуальные вакансии в городе ${city}. Условия труда, зарплаты и легальное трудоустройство в Европе.`;

  const keywords = [...keywordsSet, city, "вакансия", "работа за границей", "трудоустройство"].join(", ");

  return {
    title: `Вакансии в ${city} – Работа за границей | Etalones`,
    description,
    keywords,
    openGraph: {
      title: `Вакансии в ${city} – Работа за границей`,
      description,
      type: "website",
      url,
      locale: "ru_RU",
      images: imageFB ? [imageFB] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `Вакансии в ${city} – Работа за границей`,
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

export default async function VacanciesByCityPage({ params }: Props) {

  return (
    <>

    </>
  );
}
