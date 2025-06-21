import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";
import VacanciesTabs from "@/components/VacanciesTabs/VacanciesTabs";
import { fetchVacanciesGrouped } from "@/lib/api/getVacancy";


export default async function VacanciesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { city?: string; vacancyId?: string; title?: string; country?: string, slug?: string };
}) {
  const grouped = await fetchVacanciesGrouped();

  return (
    <div className="max-w-screen-xl mx-auto px-5 ">
    <Breadcrumbs />
      <VacanciesTabs grouped={grouped}
        profession={params.title || ""}
        country={params.country || ""}
        initialCity={params.city}
        initialVacancyId={params.slug} />
      {children}
    </div>
  );
}
