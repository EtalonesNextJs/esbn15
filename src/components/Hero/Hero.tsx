'use client'
import { Button } from "@/components/ui/button";
import { ArrowUpRight, PenLine } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import PrimayForm from "../Forms/PrimaryForm";


import { TextAnimate } from "@/components/magicui/text-animate";
import { NumberTicker } from "../magicui/number-ticker";
import { ShimmerButton } from "..//magicui/shimmer-button";

const Hero = () => {
  const [open, setOpen] = useState(false);
   const [vacancyCount, setVacancyCount] = useState<number | null>(null);
    const [totalPositionsAvailable, setTotalPositionsAvailable] = useState<number | null>(null);
  
    useEffect(() => {
      const fetchStats = async () => {
        try {
          const res = await fetch('/api/stats');
          const data = await res.json();
          setVacancyCount(data.vacancyCount);
          setTotalPositionsAvailable(data.place);
        } catch (error) {
          console.error('Ошибка загрузки данных:', error);
        }
      };
  
      fetchStats();
    }, []);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <div className="min-h-3/4 flex items-center justify-center px-6 " 
    style={{ backgroundImage: 'url(/main/primary_sh.jpg)', backgroundSize: 'cover', backgroundPosition: 'right' }}
    >

      <div className="relative z-10 text-center text-white max-w-2xl my-5">
        <h1 className="mt-6 text-3xl w-max sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
      <TextAnimate animation="slideLeft" by="character">
        Ищете работу в Европе?
        </TextAnimate>
        </h1>
        <div className="mt-6 text-[17px] md:text-lg">
        На данный момент открыто &nbsp;
        <NumberTicker
      value={vacancyCount || 5}
      className="whitespace-pre-wrap font-medium tracking-tighter text-white dark:text-black"
    /> вакансий,
        и &nbsp;
        <NumberTicker
      value={totalPositionsAvailable || 5}
      className="whitespace-pre-wrap font-medium tracking-tighter text-white dark:text-black"
    /> свободных мест
        </div>
        <div className="mt-12 flex items-center justify-center flex-wrap gap-4">
        <Link href="/vacancy/all">
        <ShimmerButton className="shadow-2xl" background='#870B0B55' >
          <div className="rounded-full text-base flex gap-2">
            Смотреть предложения <ArrowUpRight className="!h-5 !w-5" />
          </div>
          </ShimmerButton>
          </Link>
          <DialogTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-black shadow-none cursor-pointer"
          >
            <PenLine className="!h-5 !w-5" /> Заполнить анкету
          </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              Анкета работника
            </DialogTitle>
            <PrimayForm setOpen={setOpen}/>
          </DialogContent>
        </div>
      </div>
    </div>
    </Dialog>
  );
};

export default Hero;
