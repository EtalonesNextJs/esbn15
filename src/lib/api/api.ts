const vacancyCache = new Map<string, Promise<any>>();

export async function getVacanciesByProfessionGroupedByCity() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancy/vacancies-by-profession-grouped`, {
      next: { revalidate: 60 }, // ISR: кешируем на 60 сек
    });

    if (!res.ok) {
      throw new Error("Ошибка при загрузке вакансий по городам");
    }

    return await res.json();
  } catch (error) {
    console.error("getVacanciesByProfessionGroupedByCity error:", error);
    return [];
  }
}

export async function getVacancies(
  type: string, 
  offset = 0, 
  limit = 10, 
  filters: { [key: string]: string | boolean | undefined } = {}
) {
  try {
    const params = new URLSearchParams();

    params.append('type', type);
    params.append('offset', offset.toString());
    params.append('limit', limit.toString());

    // Добавляем фильтры в query параметры
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        // Если булево — преобразуем в строку
        params.append(key, String(value));
      }
    });

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancy?${params.toString()}`;

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return { vacancies: [], total: 0 };

    return await res.json(); // { vacancies, total }
  } catch (error) {
    return { vacancies: [], total: 0 };
  }
}



export async function getVacancyById(id: string) {
  if (vacancyCache.has(id)) {
    return vacancyCache.get(id);
  }
  const promise = (async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancy/${id}`, { cache: 'no-store' });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  })();
  vacancyCache.set(id, promise);
  return promise;
}
// /lib/api.ts
export async function getVacancyBySlug(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancy/slug/${slug}`, {
      next: { revalidate: 60 } // ✅ корректно
    });

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchVacanciesByProfession(city: string, profession: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/vacancy/by-title?city=${encodeURIComponent(city)}&profession=${encodeURIComponent(profession)}`,
    { cache: 'no-store' }
  );
  if (!res.ok) return null;
  return res.json();
}

