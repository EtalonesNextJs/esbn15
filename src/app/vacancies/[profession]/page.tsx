import { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";
import VacanciesByCityAccordion from "@/components/VacanciesByCityAccordion/VacanciesByCityAccordion";
import { getVacanciesByProfessionGroupedByCity } from "@/lib/api/api";

interface Props {
  params: { profession: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Вакансии ${params.profession} в Европе`,
    description: `Актуальные вакансии по профессии ${params.profession}. Устроиться на работу в Европе просто.`,
  };
}

export default async function VacancyProfessionPage({ params }: Props) {
  const vacanciesGrouped = await getVacanciesByProfessionGroupedByCity(params.profession);

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">
      <Breadcrumbs />
      <h1 className="text-3xl font-bold mb-6">Вакансии на профессию: {params.profession}</h1>
      <VacanciesByCityAccordion groupedVacancies={[]}  />
    </div>
  );
}
