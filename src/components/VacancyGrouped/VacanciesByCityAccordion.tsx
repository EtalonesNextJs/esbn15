// "use client";

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { VacancyType } from "@/lib/types/vacancy";
// import { CarouselImagesVacancy } from "../Carousel/CarouselImagesVacancy";
// import { useEffect, useState } from "react";

// type Props = {
//   city: string;
//   vacancies: VacancyType[];
//   onVacancySelect?: (vacancy: VacancyType) => void;
//   initialSlug?: string;
// };

// const VacanciesByCityAccordion = ({ city, vacancies, onVacancySelect,initialSlug }: Props) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//  useEffect(() => {
//   if (!initialSlug || vacancies.length === 0) return;
//   const foundIndex = vacancies.findIndex(v => v.slug === initialSlug);
//   console.log("initialSlug", initialSlug);
//   console.log("foundIndex", foundIndex);
  
//   if (foundIndex !== -1) {
//     setActiveIndex(foundIndex);
//     onVacancySelect?.(vacancies[foundIndex]);
//   } else {
//     console.warn(`Slug "${initialSlug}" not found in vacancies.`);
//     // 🔒 НЕ вызываем onVacancySelect — это предотвратит побочные эффекты (например, редирект)
//     // Можно даже setActiveIndex(0) или оставить всё как есть
//   }
// }, [initialSlug, vacancies, onVacancySelect]);


//   const images = vacancies.map((vac) =>
//     Array.isArray(vac.imageFB)
//       ? vac.imageFB[0]
//       : vac.imageFB || "/default.jpg"
//   );

//   return (
//     <div className="mb-12 w-full mx-auto flex justify-between gap-10">
//       {/* Карусель */}
//       <div className="flex flex-col gap-4">
//         <CarouselImagesVacancy
//   images={images}
//   currentIndex={activeIndex}
//   onSlideChange={(index) => {
//     setActiveIndex(index);
//     onVacancySelect?.(vacancies[index]); 
//   }}
// />
        
//       </div>

//       {/* Аккордеон */}
//       <div>
//         <h2 className="text-2xl text-end font-semibold mb-4">{city}</h2>
//         <Accordion
//   key={initialSlug || "default"} // ключ заставит React пересоздать аккордеон
//   type="single"
//   collapsible
//   value={undefined}
//   onValueChange={(val) => {
//     const index = parseInt(val?.replace("item-", "") ?? "0", 10);
//     setActiveIndex(index);
//     onVacancySelect?.(vacancies[index]);
//   }}
//   className="flex gap-5 justify-end flex-wrap w-hull max-w-screen-md md:max-w-screen-xl"
// >

//       {vacancies.map(({ title, roof_type }, index) => (
//             <AccordionItem
//               key={index}
//               value={`item-${index}`}
//               className="data-[state=open]:border-b-2 data-[state=open]:border-primary"
//             >
//               <AccordionTrigger className="text-xs">{title}</AccordionTrigger>
//               {/* <AccordionContent className="text-[17px] leading-relaxed text-muted-foreground">
//                 {roof_type}
//               </AccordionContent> */}
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

const VacanciesByCityAccordion = ({ city, vacancies, onVacancySelect, initialSlug }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [accordionValue, setAccordionValue] = useState(`item-0`);

  useEffect(() => {
    if (!initialSlug || vacancies.length === 0) return;
    const foundIndex = vacancies.findIndex(v => v.slug === initialSlug);
    if (foundIndex !== -1) {
      setActiveIndex(foundIndex);
      setAccordionValue(`item-${foundIndex}`);
      onVacancySelect?.(vacancies[foundIndex]);
    }
  }, [initialSlug, vacancies, onVacancySelect]);

  const images = vacancies.map((vac) =>
    Array.isArray(vac.imageFB)
      ? vac.imageFB[0]
      : vac.imageFB || "/default.jpg"
  );

  return (
    <div className=" w-full mx-auto flex justify-between gap-10">
      {/* Карусель */}
      <div className="flex ">
        <CarouselImagesVacancy
          images={images}
          currentIndex={activeIndex}
          onSlideChange={(index) => {
            setActiveIndex(index);
            setAccordionValue(`item-${index}`);
            onVacancySelect?.(vacancies[index]);
          }}
        />
      </div>

      {/* Аккордеон */}
      <div>
        <h2 className="text-2xl text-end font-semibold ">{city}</h2>
        <Accordion
          type="single"
          collapsible
          value={accordionValue}
          onValueChange={(val) => {
            if (!val) return;
            const index = parseInt(val.replace("item-", ""), 10);
            setActiveIndex(index);
            setAccordionValue(val); // синхронизация value
            onVacancySelect?.(vacancies[index]);
          }}
          className="flex gap-5 justify-end flex-wrap w-hull max-w-screen-md md:max-w-screen-xl"
        >
          {vacancies.map(({ title }, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="data-[state=open]:border-b-2 data-[state=open]:border-primary"
            >
              <AccordionTrigger className="text-xs">{title}</AccordionTrigger>
              {/* <AccordionContent>{roof_type}</AccordionContent> */}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default VacanciesByCityAccordion;
