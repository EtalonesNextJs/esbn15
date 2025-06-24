import VacancyCard from "@/components/Vacancy/VacancyCard/VacancyCard";
import { fetchVacanciesByProfession } from "@/lib/api/api";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{
    city: string;
    profession: string;
  }>;
};




// Метаданные
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { city, profession } = await params;

  const decodedCity = decodeURIComponent(city);
  const decodedProfession = decodeURIComponent(profession);

  const vacancies = await fetchVacanciesByProfession(decodedCity, decodedProfession);

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

  const vacancies = await fetchVacanciesByProfession(decodedCity, decodedProfession) || [];

  

  return (
    <div className="p-0">
      <h1 className="text-2xl font-bold mb-4">Похожие вакансии {decodedProfession} в других городах</h1>

      {vacancies.length === 0 ? (
        <p>Вакансии не найдены.</p>
      ) : (
        <ul className="space-y-4">
          {vacancies.map((vacancy: any) => (
           <VacancyCard key={vacancy._id} vacancy={vacancy} />
          ))}
        </ul>
      )}

      <hr className="my-8" />

     
    </div>
  );
}
