// lib/api.ts

export async function getVacancyById(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancy/${id}`, {
      cache: 'no-store', // отключить кэш, если нужно всегда актуальные данные
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Ошибка при загрузке вакансии:', err);
    return null;
  }
}
