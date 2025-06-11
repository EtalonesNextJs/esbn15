/** @type {import('next-sitemap').IConfig} */
const siteUrl = 'https://www.etalones.com';

module.exports = {
  siteUrl,
  generateRobotsTxt: true,

  additionalPaths: async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/vacancy/all?type=all`;
    console.log(`🌐 Запрос к API вакансий: ${apiUrl}`);

    let vacancies = [];

    try {
      const res = await fetch(apiUrl, { cache: 'no-store' });

      if (!res.ok) {
        console.error('❌ Ошибка при получении вакансий:', res.statusText);
        return [];
      }

      vacancies = await res.json();
    } catch (err) {
      console.error('❌ Ошибка запроса:', err);
      return [];
    }

    if (!Array.isArray(vacancies)) {
      console.warn('⚠️ API вернул не массив вакансий.');
      return [];
    }

    const paths = vacancies
      .filter(v => typeof v.slug === 'string' && v.slug.trim() !== '')
      .map(vac => ({
        loc: `/vacancy/${vac.slug}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: vac.updatedAt ? new Date(vac.updatedAt).toISOString() : undefined,
      }));

    console.log(`✅ В sitemap добавлено ${paths.length} вакансий.`);
    return paths;
  },
};
