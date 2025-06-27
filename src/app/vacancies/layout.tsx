// import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";
// import VacanciesTabs from "@/components/VacanciesTabs/VacanciesTabs";
// import { fetchVacanciesGrouped } from "@/lib/api/getVacancy";
// import { Filter } from "lucide-react";


// export default async function VacanciesLayout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: { city?: string; vacancyId?: string; title?: string; country?: string, slug?: string };
// }) {
//   const grouped = await fetchVacanciesGrouped();

//   return (
//     <div className="max-w-screen-xl mx-auto px-5 ">
//       <div className="w-full flex justify-between items-center mb-5">
//     <Breadcrumbs />
// <Filter/>
//       </div>
//       <VacanciesTabs grouped={grouped}
//         profession={params.title || ""}
//         country={params.country || ""}
//         initialCity={params.city}
//         initialVacancyId={params.slug} />
//       {children}
//     </div>
//   );
// }
import { fetchVacanciesGrouped } from "@/lib/api/getVacancy";
import VacanciesTabsClient from "@/components/VacanciesTabs/VacanciesTabsClient";
import { FilterProvider } from "@/context/FilterContext";

export default async function VacanciesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { city?: string; vacancyId?: string; title?: string; country?: string; slug?: string };
}) {
  const grouped = await fetchVacanciesGrouped();

  return (
     <FilterProvider>

    <div className="">


      <VacanciesTabsClient
        grouped={grouped}
        profession={params.title || ""}
        country={params.country || ""}
        initialCity={params.city}
        initialVacancyId={params.slug}
        />

      {children}
    </div>
        </FilterProvider>
  );
}
