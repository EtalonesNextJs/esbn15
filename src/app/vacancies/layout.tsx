import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";
import VacanciesTabs from "@/components/VacanciesTabs/VacanciesTabs";

async function fetchVacanciesGrouped() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancy/grouped-by-city`, {
    cache: "force-cache", 
  });
  if (!res.ok) throw new Error("Failed to fetch vacancies");
  const grouped = await res.json();
  return grouped;
}

export default async function VacanciesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { city?: string; vacancyId?: string; title?: string; country?: string, slug?: string };
}) {
    console.log("📦 layout params:", params);
  // Параметры, если нужны, пока не используешь
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
