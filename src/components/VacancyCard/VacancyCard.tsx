'use client';

import { VacancyType } from "@/lib/types/vacancy";
import { useState } from "react";
import Image from "next/image";
import { Drawer, DrawerTrigger } from "../ui/drawer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { HandCoins, MapPinned } from "lucide-react";
import DrawerContentComponent from "../Drawer/DrawerContentComponent";

const VacancyCard = ({ vacancy }: { vacancy: VacancyType }) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Card className="w-[200px] relative">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={vacancy?.imageFB || "/main/logofordafaultimage.jpg"}
              alt="Vacancy"
              width={200}
              height={200}
              loading="lazy"
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
        </Card>
      </DrawerTrigger>

      {open && <DrawerContentComponent vacancy={vacancy} />}
    </Drawer>
  );
};

export default VacancyCard;
