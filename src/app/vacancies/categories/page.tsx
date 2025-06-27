import Categories from '@/components/Categories/Categories';


const VacanciesCategoryPage = async () => {
 const categories = [
  { key: 'beton', name: 'Бетон' },
  { key: 'electric', name: 'Электрика' },
  { key: 'indor', name: 'Внутренние работы' },
  { key: 'kamen', name: 'Каменная кладка' },
  { key: 'montazh', name: 'Монтаж' },
  { key: 'noexp', name: 'Без опыта' },
  { key: 'krovlya', name: 'Кровля' },
  { key: 'santehnic', name: 'Сантехника' },
  { key: 'tehnic', name: 'Техника' },
];

  return <Categories categories={categories} />;
};


export default VacanciesCategoryPage;


// import GlassIcons from "@/components/GlassIcons/GlassIcons";
// import { Betonomeshalka, Brigs, Crane, Electric, Home, Plumber, Street, Tools, UserLane } from "@/components/icons/iconsGlassIcons";
// import { FileText } from "lucide-react";

// const iconMap: Record<string, React.ReactElement> = {
//   beton: <Betonomeshalka width={100} height={100} />,  
//   electric: <Electric width={100} height={100} />,
//   indor: <Home width={100} height={100} />,
//   kamen: <Brigs width={100} height={100} />,
//   montazh: <Crane width={100} height={100} />,
//   noexp: <UserLane width={100} height={100} />,
//   krovlya: <Street width={100} height={100} />,
//   santehnic: <Plumber width={150} height={150} />, 
//   tehnic: <Tools width={100} height={100} />,
// };

// const colorMap: Record<string, string> = {
//   beton: "grayTwo",
//   electric: "grayTwo",
//   indor: "grayTwo",
//   kamen: "grayTwo",
//   montazh: "grayTwo",
//   noexp: "grayTwo",
//   krovlya: "grayTwo",
//   santehnic: "grayTwo",
//   tehnic: "grayTwo",
// };

// // Используем асинхронный серверный компонент с try-catch и абсолютным URL
// const VacanciesCategoryPage = async () => {
//   let categories = [];
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://etalones.com'}/api/vacancies/categories`, {
//       cache: 'no-store',
//     });

//     if (!res.ok) {
//       // Логируем, возвращаем пустой массив, чтобы не падать
//       console.error('Failed to fetch categories:', res.statusText);
//     } else {
//       const data = await res.json();
//       categories = data.categories || [];
//     }
//   } catch (error) {
//     console.error('Fetch error:', error);
//   }

//   const items = categories.map((cat: { key: string; name: string }) => ({
//     icon: iconMap[cat.key] || <FileText />,
//     color: colorMap[cat.key] || "blue",
//     label: cat.name,
//     href: `/vacancies/categories/${cat.key}`,
//   }));

//   return (
//     <div className="max-w-screen-xl mx-auto px-5 flex flex-col items-center justify-center">
//       <p className="text-center text-3xl font-bold my-5">Категории:</p>
//       <GlassIcons items={items} className="custom-class" />
//     </div>
//   );
// };

// export default VacanciesCategoryPage;
