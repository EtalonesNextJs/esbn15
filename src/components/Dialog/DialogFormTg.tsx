import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import DialogAnketaContent from "./DialogAnketaContent";
import { VacancyType } from "@/lib/types/vacancy";

export default function DialogFormTg({ vacancy }: { vacancy: VacancyType }) {
    const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 text-center">
      <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button className="bg-green-800 hover:bg-green-700 text-white transition-all duration-200 ease-in-out">
      Оставить заявку
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
  <DialogAnketaContent vacancy={vacancy} setOpen={setOpen} />
      </DialogContent>
</Dialog>
    </div>
  )
}