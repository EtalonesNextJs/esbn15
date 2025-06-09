// 'use client'

// import { cn } from "@/lib/utils";
// import { Marquee } from "@/components/magicui/marquee";
// import { useVacancies } from "@/context/VacancyContext";
// import { VacancyType } from "@/lib/types/vacancy";
// import Image from "next/image";
// import { BellElectric, Car, DockIcon, Euro, FileStack, HandCoins, Home,  MapIcon, MapPinCheck, MapPinned } from "lucide-react";
// import { Dialog } from "../ui/dialog";
// import { AspectRatio } from "@radix-ui/react-aspect-ratio";
// import DrawerContentComponent from "../Drawer/DrawerContentComponent";
// import { Button } from "../ui/button";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
// import { Drawer, DrawerTrigger } from "../ui/drawer";
// import Link from "next/link";
// const VacancyCard = ( { vacancy }: { vacancy: VacancyType }) => {
//     return (
//       <Dialog>
//       <Drawer>
//       <DrawerTrigger asChild>
//       <Card className="w-[200px]  relative">
//         <AspectRatio ratio={16 / 9} >
//         <Image src={vacancy?.imageFB || ''} alt={"Vacancy"} width={200} height={200} />
//         </AspectRatio>
//         <CardHeader className="mt-1">
//           <CardTitle className="text-xl">{vacancy?.title}</CardTitle>
//           <CardDescription>
//             {vacancy?.roof_type}
//             </CardDescription>
//         </CardHeader>
//         <CardContent className=" flex flex-col gap-2 justify-between">
//           <div className="flex items-center gap-2">
//             <MapPinned  className="text-primary" />
//             <p >{vacancy?.location}</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <HandCoins className="text-primary" />
//             <p >{vacancy?.salary}</p>
//           </div>

        
  
//         </CardContent>
        
//           <DrawerContentComponent vacancy={vacancy} />
//       </Card>
//         </DrawerTrigger>
//       </Drawer>
//        </Dialog>
//   )}


// export function MyMarquee() {
//   const { vacancies } = useVacancies();

//   // Безопасное извлечение массива всех вакансий
//   const allVacancies = vacancies["all"] ?? [];

//   // Разделим пополам для двух строк
//   const firstRow = allVacancies.slice(0, allVacancies.length / 2);
//   const secondRow = allVacancies.slice(allVacancies.length / 2);

//   return (
//     <><div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
//           <Marquee pauseOnHover className="[--duration:20s]">
//               {firstRow.map((vacancy, index) => (
//                   <VacancyCard key={index} vacancy={vacancy} />
//               ))}
//           </Marquee>
//           <Marquee reverse pauseOnHover className="[--duration:20s]">
//               {secondRow.map((vacancy, index) => (
//                   <VacancyCard key={index} vacancy={vacancy} />
//               ))}
//           </Marquee>
//           <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
//           <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
//       </div><Button type="button" className="flex justify-center my-2 mx-auto">
//         <Link className="text-white" href="/vacancy/all">
//         Показать все
//         </Link>
//         </Button></>
//   );
// }
'use client'

import { useEffect } from "react";
import { Marquee } from "@/components/magicui/marquee";
import { useVacancies } from "@/context/VacancyContext";
import { VacancyType } from "@/lib/types/vacancy";
import Image from "next/image";
import {
  HandCoins,
  MapPinned
} from "lucide-react";
import { Dialog } from "../ui/dialog";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import DrawerContentComponent from "../Drawer/DrawerContentComponent";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Drawer, DrawerTrigger } from "../ui/drawer";
import Link from "next/link";

const VacancyCard = ({ vacancy }: { vacancy: VacancyType }) => {
  // Если данных нет, просто не отображать карточку
  if (!vacancy) return null;

  return (
    <Dialog>
      <Drawer>
        <DrawerTrigger asChild>
          <Card className="w-[200px] relative">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={vacancy?.imageFB || "/main/logofordafaultimage.jpg"}
                alt={"Vacancy"}
                width={200}
                height={200}
              />
            </AspectRatio>
            <CardHeader className="mt-1">
              <CardTitle className="text-xl">{vacancy?.title}</CardTitle>
              <CardDescription>{vacancy?.roof_type}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 justify-between">
              <div className="flex items-center gap-2">
                <MapPinned className="text-primary" />
                <p>{vacancy?.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <HandCoins className="text-primary" />
                <p>{vacancy?.salary}</p>
              </div>
            </CardContent>

            <DrawerContentComponent vacancy={vacancy} />
          </Card>
        </DrawerTrigger>
      </Drawer>
    </Dialog>
  );
};

export function MyMarquee() {
  const { vacancies, loadFromCacheOrFetch } = useVacancies();

  useEffect(() => {
    if (!vacancies["all"]) {
      loadFromCacheOrFetch("all", async () => {
        const response = await fetch(`/api/vacancy/all`);
        const data = await response.json();
        return data;
      });
    }
  }, [vacancies, loadFromCacheOrFetch]);

  // Безопасное извлечение массива всех вакансий
  const allVacancies = vacancies["all"] ?? [];

  // Разделим пополам для двух строк
  const firstRow = allVacancies.slice(0, allVacancies.length / 2);
  const secondRow = allVacancies.slice(allVacancies.length / 2);

  return (
    <>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((vacancy, index) => (
            <VacancyCard key={index} vacancy={vacancy} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((vacancy, index) => (
            <VacancyCard key={index} vacancy={vacancy} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
      <Button type="button" className="flex justify-center my-2 mx-auto">
        <Link className="text-white" href="/vacancy/category/all">
          Показать все
        </Link>
      </Button>
    </>
  );
}
