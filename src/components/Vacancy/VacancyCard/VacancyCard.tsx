// 'use client'

// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { AspectRatio } from "@radix-ui/react-aspect-ratio";
// import { Car, FileStack, HandCoins, Home, MapPinned } from "lucide-react";
// import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
// import DrawerContentComponent from "@/components/Drawer/DrawerContentComponent";
// import { Dialog } from "@/components/ui/dialog";
// import { VacancyType } from "@/lib/types/vacancy";

// export default function VacancyCard({ vacancy }: { vacancy: VacancyType }) {
//   return (
//     <Dialog>
//       <Drawer>
//         <Card className="w-full max-w-[400px] h-full relative">
//           <AspectRatio ratio={16 / 9}>
//             <Image
//               src={vacancy?.imageFB || ""}
//               alt="Vacancy"
//               width={400}
//               height={200}
//               className="rounded-md object-cover"
//             />
//           </AspectRatio>
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

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Car, FileStack, HandCoins, Home, MapPinned } from "lucide-react";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import DrawerContentComponent from "@/components/Drawer/DrawerContentComponent";
import { Dialog } from "@/components/ui/dialog";
import { VacancyType } from "@/lib/types/vacancy"; // Тип вакансии

export default function VacancyCard({ vacancy }: { vacancy: VacancyType }) {
  return (
    
    <Dialog>
      <Drawer>
        <Card className="w-full max-w-[400px] h-full relative">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={vacancy?.imageFB || "/main/logofordafaultimage.jpg"}
              alt="Vacancy"
              width={400}
              height={200}
              className="rounded-md object-cover"
            />
          </AspectRatio>
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
