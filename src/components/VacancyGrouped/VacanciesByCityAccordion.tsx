
// "use client";

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { VacancyType } from "@/lib/types/vacancy";
// import { CarouselImagesVacancy } from "../Carousel/CarouselImagesVacancy";
// import { useState } from "react";

// type Props = {
//   city: string;
//   vacancies: VacancyType[];
// };

// const VacanciesByCityAccordion = ({ city, vacancies }: Props) => {
//   const [activeIndex, setActiveIndex] = useState("item-0");

//   const images = vacancies.map((vac) =>
//     Array.isArray(vac.imageFB)
//       ? vac.imageFB[0] // берём первое изображение, если массив
//       : vac.imageFB || "/default.jpg" // или дефолт
//   );

//   return (
//     <div className="mb-12 w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
//       {/* Левая колонка — Карусель */}
//       <div className="flex flex-col gap-4">
//         <CarouselImagesVacancy
//           images={images}
//           onSlideChange={(index) => setActiveIndex(`item-${index}`)}
//         />
//       </div>

//       {/* Правая колонка — Аккордеон */}
//       <div>
//         <h2 className="text-2xl font-semibold mb-4">{city}</h2>
//         <Accordion
//           type="single"
//           collapsible
//           value={activeIndex}
//           onValueChange={(val) => setActiveIndex(val)}
//           className="w-full"
//         >
//           {vacancies.map(({ title, roof_type }, index) => (
//             <AccordionItem
//               key={index}
//               value={`item-${index}`}
//               className="data-[state=open]:border-b-2 data-[state=open]:border-primary"
//             >
//               <AccordionTrigger className="text-lg">{title}</AccordionTrigger>
//               <AccordionContent className="text-[17px] leading-relaxed text-muted-foreground">
//                 {roof_type}
//               </AccordionContent>
//             </AccordionItem>
//           ))}
//         </Accordion>
//       </div>
//     </div>
//   );
// };

// export default VacanciesByCityAccordion;
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { VacancyType } from "@/lib/types/vacancy";
import { CarouselImagesVacancy } from "../Carousel/CarouselImagesVacancy";
import { useEffect, useState } from "react";

type Props = {
  city: string;
  vacancies: VacancyType[];
  onVacancySelect?: (vacancy: VacancyType) => void;
  initialSlug?: string;
};

const VacanciesByCityAccordion = ({ city, vacancies, onVacancySelect,initialSlug }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
 useEffect(() => {
  if (!initialSlug || vacancies.length === 0) return;
  const foundIndex = vacancies.findIndex(v => v.slug === initialSlug);
  console.log("initialSlug", initialSlug);
  console.log("foundIndex", foundIndex);
  
  if (foundIndex !== -1) {
    setActiveIndex(foundIndex);
    onVacancySelect?.(vacancies[foundIndex]);
  } else {
    console.warn(`Slug "${initialSlug}" not found in vacancies.`);
    // 🔒 НЕ вызываем onVacancySelect — это предотвратит побочные эффекты (например, редирект)
    // Можно даже setActiveIndex(0) или оставить всё как есть
  }
}, [initialSlug, vacancies, onVacancySelect]);


  const images = vacancies.map((vac) =>
    Array.isArray(vac.imageFB)
      ? vac.imageFB[0]
      : vac.imageFB || "/default.jpg"
  );

  return (
    <div className="mb-12 w-full mx-auto flex justify-between gap-10">
      {/* Карусель */}
      <div className="flex flex-col gap-4">
        <CarouselImagesVacancy
  images={images}
  currentIndex={activeIndex}
  onSlideChange={(index) => {
    setActiveIndex(index);
    onVacancySelect?.(vacancies[index]); 
  }}
/>
        
      </div>

      {/* Аккордеон */}
      <div>
        <h2 className="text-2xl text-end font-semibold mb-4">{city}</h2>
        <Accordion
  key={initialSlug || "default"} // ключ заставит React пересоздать аккордеон
  type="single"
  collapsible
  value={undefined}
  onValueChange={(val) => {
    const index = parseInt(val?.replace("item-", "") ?? "0", 10);
    setActiveIndex(index);
    onVacancySelect?.(vacancies[index]);
  }}
  className="w-md flex gap-5 justify-end flex-wrap"
>

      {vacancies.map(({ title, roof_type }, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="data-[state=open]:border-b-2 data-[state=open]:border-primary"
            >
              <AccordionTrigger className="text-xs">{title}</AccordionTrigger>
              {/* <AccordionContent className="text-[17px] leading-relaxed text-muted-foreground">
                {roof_type}
              </AccordionContent> */}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default VacanciesByCityAccordion;
