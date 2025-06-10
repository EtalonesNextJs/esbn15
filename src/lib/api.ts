const vacancyCache = new Map<string, Promise<any>>();

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
export async function getVacancyBySlug(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancy/slug/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
