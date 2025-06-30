// export async function fetchVacanciesGrouped() {
//   console.log('Fetching vacancies from:', `${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancy/grouped-by-city`);
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancy/grouped-by-city`, {
//     cache: "force-cache", 
//   });
//   if (!res.ok) throw new Error("Failed to fetch vacancies");
//   const grouped = await res.json();
//   return grouped;
// }
export async function fetchVacanciesGrouped() {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancy/grouped-by-city`;
    const res = await fetch(apiUrl, {
      cache: "no-store", // Отключаем кэш для теста
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch vacancies: ${res.status} ${res.statusText}`);
    }
    const grouped = await res.json();
    return grouped;
  } catch (error: any) {
    console.error('Error in fetchVacanciesGrouped:', error.message);
    return [];
  }
}