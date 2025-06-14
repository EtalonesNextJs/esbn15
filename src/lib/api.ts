const vacancyCache = new Map<string, Promise<any>>();

export async function getVacancies(type: string) {
  const promise = (async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancy/all?type=${type}`, { cache: 'no-store' });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  })();
  return promise;
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

// export async function getVacancyBySlug(slug: string) {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancy/slug/${slug}`, { next: { revalidate: 60 } });
//     if (!res.ok) return null;
//     return await res.json();
//   } catch {
//     return null;
//   }
// }
