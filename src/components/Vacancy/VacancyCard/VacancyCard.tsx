
// 'use client';

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Car, FileStack, HandCoins, Home, MapPinned } from "lucide-react";
// import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
// import DrawerContentComponent from "@/components/Drawer/DrawerContentComponent";
// import { Dialog } from "@/components/ui/dialog";
// import { VacancyType } from "@/lib/types/vacancy"; // Тип вакансии

// export default function VacancyCard({ vacancy }: { vacancy: VacancyType }) {
//   return (
    
//     <Dialog>
//       <Drawer>
//         <Card className="w-full max-w-[400px] h-full relative pt-0!">
//      <div className="relative flex  w-full flex-col items-center justify-center overflow-hidden rounded-lg drop-shadow-md  bg-center bg-no-repeat bg-cover"
//      style={{
//     backgroundImage: `url(${vacancy.imageFB || '/default.jpg'})`,
//   }}
//      >
//       <p className="z-10 p-10 my-auto w-full h-full min-h-[200px] whitespace-pre-wrap text-center text-3xl font-medium tracking-tighter ">
//         {/* {vacancy?.title} */}
//       </p>
//     </div>
         
//           <CardHeader className="mt-6">
            
//             <CardTitle className="text-xl">{vacancy?.title}</CardTitle>
//             <CardDescription>{vacancy?.roof_type}</CardDescription>
//           </CardHeader>

//           <CardContent className="font-semibold flex flex-col gap-2 justify-between mb-7">
//             <div className="flex items-center gap-2">
//               <MapPinned className="text-primary" />
//               <p>{vacancy?.location || "Местоположение не указано"}</p>
//             </div>

//             <div className="flex items-center gap-2">
//               <HandCoins className="text-primary" />
//               <p>{vacancy?.salary || "Зарплата не указана"}</p>
//             </div>

//             <div className="flex items-center gap-2">
//               <Home className="text-primary" />
//               <p>{vacancy?.homePrice || "Жильё не указано"}</p>
//             </div>

//             {Array.isArray(vacancy.drivePermis) && vacancy.drivePermis.length > 0 && (
//               <div className="flex items-start gap-2">
//                 <Car className="text-primary" />
//                 <p>
//                   {vacancy.drivePermis.map((item, index) => (
//                     <span key={index} className="text-sm">
//                       - {item}
//                       <br />
//                     </span>
//                   ))}
//                 </p>
//               </div>
//             )}

//             {Array.isArray(vacancy.documents) && vacancy.documents.length > 0 && (
//               <div className="flex items-start gap-2">
//                 <FileStack className="text-primary" />
//                 <p>
//                   Документы:
//                   {vacancy.documents.map((doc, index) => (
//                     <span key={index} className="text-sm">
//                       <br />- {doc}
//                     </span>
//                   ))}
//                 </p>
//               </div>
//             )}
//           </CardContent>

//           <CardFooter className="absolute bottom-2 w-full">
//             <DrawerTrigger asChild>
//               <Button>Подробнее</Button>
//             </DrawerTrigger>
//             <DrawerContentComponent vacancy={vacancy} />
//           </CardFooter>
          
//         </Card>
//       </Drawer>
//     </Dialog>
//   );
// }
'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car, FileStack, HandCoins, Home, MapPinned } from "lucide-react";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import DrawerContentComponent from "@/components/Drawer/DrawerContentComponent";
import { Dialog } from "@/components/ui/dialog";
import { VacancyType } from "@/lib/types/vacancy";
import { generateSlugFromVacancy } from "@/utils/geterateSlugFromVac"; // Импорт функции генерации slug

export default function VacancyCard({ vacancy }: { vacancy: VacancyType }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const slug = generateSlugFromVacancy(vacancy);

  if (!isClient) {
    // Серверный рендер — выводим просто ссылку на страницу вакансии
    return (
      <Link
        href={slug}
        className="block w-full max-w-[400px] p-4 border rounded-lg shadow hover:shadow-md transition"
      >
        <h3 className="text-xl font-semibold">{vacancy.title}</h3>
        <p>{vacancy.location || "Местоположение не указано"}</p>
        <p>{vacancy.salary || "Зарплата не указана"}</p>
      </Link>
    );
  }

  // Клиентский рендер — карточка с Drawer и кнопкой подробнее
  return (
    <Dialog>
      <Drawer>
        <Card className="w-full max-w-[400px] h-full relative pt-0!">
          <div
            className="relative flex  w-full flex-col items-center justify-center overflow-hidden rounded-lg drop-shadow-md  bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: `url(${vacancy.imageFB || "/default.jpg"})`,
            }}
          >
            <p className="z-10 p-10 my-auto w-full h-full min-h-[200px] whitespace-pre-wrap text-center text-3xl font-medium tracking-tighter ">
              {/* {vacancy?.title} */}
            </p>
          </div>

          <CardHeader className="mt-6">
            <CardTitle className="text-xl">{vacancy?.title}</CardTitle>
            <CardDescription>{vacancy?.roof_type}</CardDescription>
          </CardHeader>

          <CardContent className="font-semibold flex flex-col gap-2 justify-between mb-7">
            <div className="flex items-center gap-2">
              <MapPinned className="text-primary" />
              <p>{vacancy?.location || "Местоположение не указано"}</p>
            </div>

            <div className="flex items-center gap-2">
              <HandCoins className="text-primary" />
              <p>{vacancy?.salary || "Зарплата не указана"}</p>
            </div>

            <div className="flex items-center gap-2">
              <Home className="text-primary" />
              <p>{vacancy?.homePrice || "Жильё не указано"}</p>
            </div>

            {Array.isArray(vacancy.drivePermis) && vacancy.drivePermis.length > 0 && (
              <div className="flex items-start gap-2">
                <Car className="text-primary" />
                <p>
                  {vacancy.drivePermis.map((item, index) => (
                    <span key={index} className="text-sm">
                      - {item}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
            )}

            {Array.isArray(vacancy.documents) && vacancy.documents.length > 0 && (
              <div className="flex items-start gap-2">
                <FileStack className="text-primary" />
                <p>
                  Документы:
                  {vacancy.documents.map((doc, index) => (
                    <span key={index} className="text-sm">
                      <br />- {doc}
                    </span>
                  ))}
                </p>
              </div>
            )}
          </CardContent>

          <CardFooter className="absolute bottom-2 w-full">
            <DrawerTrigger asChild>
              <Button>Подробнее</Button>
            </DrawerTrigger>
            <DrawerContentComponent vacancy={vacancy} />
          </CardFooter>
        </Card>
      </Drawer>
    </Dialog>
  );
}
