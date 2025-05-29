import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Userfull = () => {
  return (
    <div className="relative min-h-max flex items-center justify-center bg-primary text-white">
      <div className="max-w-screen w-full mx-auto grid lg:grid-cols-3 gap-12 px-6 py-12">
      <Image src="/main/women-2.jpg" alt="main" width={450} height={500}  className=" rounded-xl hidden md:block"/>
        <div className="col-span-2">
          
          <h1 className="mt-6 max-w-[17ch] text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-[1.2]">
          Полезное
          </h1>
          <p className="mt-6 text-lg">
          В этом разделе вы сможете найти много полезной информации о работе и жизни в Польше. Здесь вы найдете статьи, которые расскажут вам где и как оформить нужные документы для легального пребывания за границей. Также, сможете составить себе приблизительный план действий по поиску работы и планировании выезда; и узнать какой минимальный прожиточный минимум вам нужно будет иметь с собой на первое время. Как говорят: осведомленность - лучшее оружие.
          </p>

          <div className=" grid grid-cols-1 md:grid-cols-3  text-white  mt-5">
                        <div className=" w-full">
                            <div className="">Средний доход
                            </div>
                            <div className="text-2xl font-bold">в 2024 году</div>
                            <div className="">5 662 PLN</div>
                        </div>

                        <div className="stat">
                            <div className="">Иностранцы</div>
                            <div className="text-2xl font-bold">1.6M</div>
                            <div className="">работающие в Польше</div>
                        </div>

                        <div className="stat">
                            <div className="text-2xl font-bold">647 052</div>
                            <div className="">Новые рабочие места</div>
                            <div className=" ">в 2024 году</div>
                        </div>
                    </div>
        </div>
      </div>
<Link href={'/'} className="absolute left-4 bottom-2 right-4 md:left-auto md:right-4">
<Button className="border-2 border-primary text-primary bg-white hover:bg-primary hover:text-white">
Перейти
</Button>
</Link>
    </div>
  );
};

export default Userfull;
