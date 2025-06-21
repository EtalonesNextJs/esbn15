export async function fetchVacanciesGrouped() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancy/grouped-by-city`, {
    cache: "force-cache", 
  });
  if (!res.ok) throw new Error("Failed to fetch vacancies");
  const grouped = await res.json();
  return grouped;
}