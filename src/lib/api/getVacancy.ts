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
    console.log('API URL:', `${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancy/grouped-by-city`);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancy/grouped-by-city`, {
      cache: "force-cache",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch vacancies: ${res.status}`);
    }
    const grouped = await res.json();
    console.log('Fetched vacancies:', grouped);
    return grouped;
  } catch (error: any) {
    console.error('Error in fetchVacanciesGrouped:', error.message);
    return []; 
  }
}