import GlassIcons from "@/components/GlassIcons/GlassIcons";
import { Betonomeshalka, Brigs, Crane, Electric, Home, Plumber, Street, Tools, UserLane } from "@/components/icons/iconsGlassIcons";
import { fetchCategories } from "@/lib/api/api";
import { FileText } from "lucide-react";

const iconMap: Record<string, React.ReactElement> = {
  beton: <Betonomeshalka width={100} height={100} />,  
  electric: <Electric width={100} height={100} />,
  indor: <Home width={100} height={100} />,
  kamen: <Brigs width={100} height={100} />,
  montazh: <Crane width={100} height={100} />,
  noexp: <UserLane width={100} height={100} />,
  krovlya: <Street width={100} height={100} />,
  santehnic: <Plumber width={150} height={150} />, 
  tehnic: <Tools width={100} height={100} />,
};

const colorMap: Record<string, string> = {
  beton: "grayTwo",
  electric: "grayTwo",
  indor: "grayTwo",
  kamen: "grayTwo",
  montazh: "grayTwo",
  noexp: "grayTwo",
  krovlya: "grayTwo",
  santehnic: "grayTwo",
  tehnic: "grayTwo",
};

const VacanciesCategoryPage = async () => {
  const categories = await fetchCategories();

  const items = categories.map((cat: { key: string; name: string }) => ({
    icon: iconMap[cat.key] || <FileText />,
    color: colorMap[cat.key] || "blue",
    label: cat.name,
    href: `/vacancies/categories/${cat.key}`
  }));

  return (
    <div className="max-w-screen-xl mx-auto px-5 flex flex-col items-center justify-center">
      <p className="text-center text-3xl font-bold my-5">Категории:</p>
      <GlassIcons items={items} className="custom-class" />
    </div>
  );
};

export default VacanciesCategoryPage;
