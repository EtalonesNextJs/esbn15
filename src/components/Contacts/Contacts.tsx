import {  MailIcon, MapPinIcon, MessageCircle, PhoneIcon } from "lucide-react";
import Link from "next/link";
import { Telegram } from "../../../public/svg/telegram";
import { Viber } from "../../../public/svg/viber";
import { Instagram } from "../../../public/svg/instagram";
import ContactForm from "../Forms/ContactForm";

const Contacts = () => (
  <div className="min-h-screen flex items-center justify-center py-16">
    <div className="w-full max-w-screen-xl mx-auto px-6 xl:px-0">
      <b className="text-muted-foreground">Связаться с нами</b>
      <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
      Общайтесь с нашей дружной командой
      </h2>
      <p className="mt-3 text-base sm:text-lg">
      Мы будем рады услышать ваше мнение. Пожалуйста, заполните эту форму или отправьте нам электронное письмо.
      </p>
      <div className="mt-24 grid lg:grid-cols-2 gap-16 md:gap-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
          <div>
            <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
              <MailIcon />
            </div>
            <h3 className="mt-6 font-semibold text-xl">Почта</h3>
            <p className="my-2.5 text-muted-foreground">
            Наша дружная команда всегда готова помочь.
            </p>
            <Link
              className="font-medium text-primary"
              href="mailto:akashmoradiya3444@gmail.com"
            >
              support@etalones.com
            </Link>
          </div>
          <div>
            <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
              <MessageCircle />
            </div>
            <h3 className="mt-6 font-semibold text-xl">Мы в соцсетях</h3>
            <p className="my-2.5 text-muted-foreground">
            Будьте всегда в курсе новостей и обновлений.
            </p>
             <ul className="flex gap-5 justify-center">
                    <li className=" grayscale  hover:grayscale-0 transition-all duration-200 ease-in-out "><a target='blank' href="https://t.me/VakansiiEtalones"><Telegram width={30} height={30} /></a></li>
                    <li className=" grayscale  hover:grayscale-0 transition-all duration-200 ease-in-out "><a target='blank' href="https://invite.viber.com/?g2=AQAyInf%2Fn7gYIVEHhdr0DRiL0gFv%2BFU7%2BDoKEQWPv1MfWACpSMOQb%2Fb3UcXL4ZYh" ><Viber width={30} height={30} /></a></li>
                    <li className=" grayscale  hover:grayscale-0 transition-all duration-200 ease-in-out "><a target='blank' href="https://www.instagram.com/etalones_s_b/" ><Instagram width={30} height={30} /></a></li>
                    </ul>
            {/* <Link className="font-medium text-primary" href="#">
             Начать новый чат
            </Link> */}
          </div>
          <div>
            <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
              <MapPinIcon />
            </div>
            <h3 className="mt-6 font-semibold text-xl">Office</h3>
            <p className="my-2.5 text-muted-foreground">
              Наш офис в Варшаве.
            </p>
            <Link
              className="font-medium text-primary"
              href="https://map.google.com"
              target="_blank"
            >
              HENRYKA DOBRZAŃSKIEGO <br /> HUBALA 22D
            </Link>
          </div>
          <div>
            <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
              <PhoneIcon />
            </div>
            <h3 className="mt-6 font-semibold text-xl">Телефон</h3>
            <p className="my-2.5 text-muted-foreground">
            Пн-пт с 8 утра до 17 вечера.
            </p>
            <Link
              className="font-medium text-primary"
              href="tel:akashmoradiya3444@gmail.com"
            >
              +373 (69) 460-354
            </Link>
          </div>
        </div>

        {/* Form */}
        <ContactForm />
      </div>
    </div>
  </div>
);

export default Contacts;
