'use client'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-select";
import { ArrowRight, Blocks, Building2, Calendar, CircleCheck, MailIcon, MapPinIcon, PhoneIcon, Settings2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { UniversalDialogComponent } from "@/components/Dialog/UniversalDialogComponent";


import { TextAnimate } from "@/components/magicui/text-animate";

  type DialogKey = 'search' | 'optimize' | 'documents' | null;
const faq = [
    {
        question: "Где мы находимся?",
        answer:
            "Наш офис находится Ulica Henryka Dobrzańskiego „Hubala” 22D, 01-473 Warszawa, Польша. Также у нас открыты рекрутинговые агентства в Украине, Беларуси и Молдове.",
    },
    {
        question: "Стоимость наших услуг?",
        answer:
            "Стоимость варьируется в зависимости от многих критериев, таких как рабочий график, зарплата работника, стоимость проживания, специальность работника и т.д.",
    },
    {
        question: "Кто оплачивает жильё сотрудников?",
        answer:
            "По ряду вакансий, наши парнёры предоставляют бесплатное проживание для сотрудников, но в случае аренды жилья (котедж, квартира, хостел) сотрудник оплачивает жильё самостоятельно. Также в случаях высокой стоимости аренды, мы можем разделить сумму и оплачивать её в равных долях(наша компания/партнёр/работник).",
    },
    {
        question: "Граждане каких стран у нас работают?",
        answer:
            "Преимущественно у нас работают граждане СНГ(Украина, Молдова, Беларусь). Также к нам обращаются граждане Средней Азии, на сегодняшний день более редкими кандидатами являются граждане Евросоюза",
    },
    {
        question: "Откуда мы берём кандидатов?",
        answer:
            "Основной массив это провереные нами люди, подтвердившие свою квалификацию на наших объектах. Новые кандидаты обращаются по рекомендациям наших сотрудников(готовые поручиться за него), и по рекламе размещённой в сети, на тематических сайтах, GoogleADS, Yandex, Facebook, Instagram.",
    },
    {
        question: "Какие документы предоставляем работнику?",
        answer:
            "Трудовой договор - umowa zlecenie/umowa o pracę, справка о прохождении медицинского осмотра, подтверждение, прохождение первичных инструктажей техники безопасности, страховой полис, US-3, PIT-11, PIT-37, и другие. ",
    },
    {
        question: "Разрешение на работу в Германии?",
        answer:
            "Основным пакетом документов является следующий список:  §48(предоставляет разрешение на осуществление трудовой деятельности на территории Германии) и дополнение §13b(освобождает вас от уплаты налогов за делегированных вам сотрудников), также при необходимости регистрация SOKA-BAU(уличные работы, и другие работы зависящие от погодных условий).",
    },
    {
        question: "Какую страховку предоставляем работнику?",
        answer:
            "Каждый сотрудник отправленый в командировку регистрируется по системе страхования POLISA UBEZPIECZENIA PZU WOJAŻER, данный страховой полис покрывает расходы за полученые травмы во время работы исходя из пунктов указанных в полисе. POLISA UBEZPIECZENIA PZU WOJAŻER действует в медицинских учереждениях по всей территории Евросоюза, в частности Германии. ",
    },
    {
        question: "Как быстро мы найдем кандидата?",
        answer:
            "Поиск кандидата может занять как 5 минут так и 1 месяц, по ряду профессий (брусчатка, сантехника, электрика, штукатурка, малярка) у нас уже работают более 100 человек, и поиск займёт не много времени, но в случае узкопрофилируемых специалистов(гидравлик, оператор башенного крана, сварка аллюминия и т.п.) поиск займёт дольше времени. Также на скорость поиска могут влиять запрос специалистов со знанием немецкого, английского языков или уникальные личные требования партнёра.",
    },
    {
        question: "Гарантии квалификации работника?",
        answer:
            "Каждый работник проходит несколько этапов собеседования, в ходе которого мы узнаём его общий опыт работы и опыт работы в Германии или странах Евросоюза,собираем фото выполненых работ, проводим тестирование на проф. пригодность и другое. Мы всегда стараемся отправлять наших провереных сотрудников, но в случе необходимости в быстром поиске привлекаем новых кандидатов ещё не работавших у нас(о чём в обязательном порядке информируем немецкого партнёра).",
    },
];

const plans = [
    {
        name: "Почасовый",
        price: "от 15",
        description:
            "Стоимость контракта зависит от специальности, рабочих часов в месяц, стоимости проживания",
        features: [
            "Разнорабочий 15-16 €/час",
            "Подмастерье 16-17 €/час",
            "Мастер 18-20 €/час",
            "Профессионал 20-23 €/час",
            "Бригада 18-25 €/час",
        ],
        buttonText: "Обсудить контракт",
    },
    {
        name: "Фиксированый",
        price: "от 800",
        isRecommended: true,
        description:
            "Стоимость контракта зависит от рабочего графика, зарплаты работника, стоимости проживания",
        features: [
            "Менее 180 рабочих час/мес",
            "Работа на предприятии",
            "Низкая з/п сотрудника",
            "Постоянная занятость",
            "Без контроля часов",
        ],
        buttonText: "Обсудить контракт",
        isPopular: true,
    },
    {
        name: "Сдельный",
        price: "от 25000",
        description:
            "Объекты на срок от 1 месяца, с фиксированной оплатой за выполненую работу",
        features: [
            "Смета выполняемых работ",
            "Работа по объёму",
            "Заитнересованность работника",
            "Минимальный контроль",
            "Только профессионалы",
        ],
        buttonText: "Предложить контракт",
    },
];

const experiences = [
    {
        title: "Трудоустройство в Etalones S&B",
        company: "Предварительные документы",
        period: "1-2 рабочих дня",
        description:
            "Мы трудоустраиваем работников на нашу компанию по Умове злицения, также мы готовим все внутриние документы.",
        technologies: ["Страховка", "Техника безопасности", "Мед. осведетельствоние", "Доп. соглашение"],
    },
    {
        title: "US-3",
        company: "Документы от ужонд (Urząd)",
        period: "3-4 рабочих дня",
        description:
            "Подача работника на командировачный лист А1, регистрация предварительного бланка US-3, в неё мы указываем:",
        technologies: ["Страна делигирования", "Сроки командировки"],
    },
    {
        title: "Командировачный лист А1",
        company: "Документы от ужонд (Urząd)",
        period: "14-21 рабочих дня",
        description:
            "Мы не можем повлиять на скорость производства документа, скорость зависит от фактической загружености паспортного стола, в А1 будут указаны:",
        technologies: ["Фирма партнёра", "Адрес командировки",  ],
    },
];

const Partners = () => {
    const [value, setValue] = useState<string>();
    const [currentDialog, setCurrentDialog] = useState<DialogKey>(null);

    return (
        <>
            <div className="max-h-screen flex items-center justify-center">
                <div className="max-w-screen-xl w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12">
                    <div>

                        <h1 className="mt-6 max-w-[17ch] text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-[1.2]">
                           
                            Откройте новые возможности для вашего бизнесса вместе с Etalones
                        </h1>
                        <p className="mt-6 max-w-[60ch] text-lg">
                            Присоединяйтесь к нашей команде, и оптимизируйте расходы на зарплаты работников, сократите расходы на налоги, освободите
                            ваше время для развития бизнесса и поиска новых заказов.
                        </p>

                    </div>
                    <div className="w-fit">
                        <Image src={'/partners/40precent.png'} width={450} height={450} alt="searchPeople"
                            className="rounded-xl"
                        />
                    </div>
                    {/* <Image src={'/partners/40precent.png'} width={350} height={350} alt="40%" className="rounded-xl" /> */}
                </div>
            </div>
            <div className="min-h-screen  flex items-center justify-center">
                <div className="w-full max-w-screen-lg mx-auto py-12 px-6">
                    <h2 className="text-3xl leading-10 sm:text-4xl md:text-[40px] md:leading-[3.25rem] font-bold tracking-tight">
                    <TextAnimate animation="blurInUp" by="character" once>
                        Мы предлагаем: 
                    </TextAnimate>
                  
                   <TextAnimate animation="slideLeft" by="character" once>
                        Воспользоваться всеми преимуществами совместной работы
                   </TextAnimate>
                    </h2>
                    <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className=" rounded-xl pt-6 md:pt-8 pb-6 px-6 col-span-1 md:col-span-2 lg:col-span-1">
                            {/* Media 1 Mobile */}
                            <div className="md:hidden mb-6  w-full bg-background border rounded-xl">
                                <Image src={'/partners/searchPeople.png'} width={350} height={350} alt="searchPeople"
                                    className="rounded-xl"
                                />
                            </div>
                            <span className="text-2xl font-semibold tracking-tight">
                                Поиск специалистов для выполнения поставленных задач
                            </span>
                            <ul className="mt-6 space-y-4">
                                <li>
                                    <div className="flex items-start gap-3">
                                        <Settings2 className="shrink-0" />
                                        <p className="-mt-0.5">
                                            Сбор подробной информации о предстоящей работе и необходимых сотрудниках
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-start gap-3">
                                        <Blocks className="shrink-0" />
                                        <p className="-mt-0.5">
                                            Настройка рекламной компании по привлечению необходимых специалистов
                                        </p>
                                    </div>
                                </li>
                            </ul>
                            <Button onClick={() => setCurrentDialog('search')} className="mt-12 w-full">
                            Ознакомиться подробнее <ArrowRight />
                            </Button>
                            
                        </div>
                        <UniversalDialogComponent currentDialog={currentDialog} onClose={() => setCurrentDialog(null)} />

                        {/* Media 1 Desktop */}
                        <div className="hidden md:flex justify-end col-span-1 md:col-span-3 lg:col-span-2">
                            <div className="w-fit">
                                <Image
                                    src={'/partners/searchPeople.png'}
                                    width={350}
                                    height={350}
                                    alt="searchPeople"
                                    className="rounded-xl"
                                />
                            </div>
                        </div>
                        {/* Media 2 Desktop */}
                        <div className="hidden md:block my-auto col-span-1 md:col-span-3 lg:col-span-2">
                            <Image src={'/partners/19612.jpg'} width={450} height={450} alt="searchPeople"
                                className="rounded-xl"
                            />
                        </div>
                        {/* Card 2 */}
                        <div className="rounded-xl pt-6 md:pt-8 pb-6 px-6 col-span-1 md:col-span-2 lg:col-span-1">
                            {/* Media 2 Mobile */}
                            <div className="md:hidden mb-6  w-fit rounded-xl">
                                <Image src={'/partners/19612.jpg'} width={450} height={450} alt="searchPeople"
                                    className="rounded-xl"
                                />
                            </div>
                            <span className="text-2xl font-semibold tracking-tight">
                                Предварительное собеседование
                            </span>
                            <ul className="mt-6 space-y-4">
                                <li>
                                    <div className="flex items-start gap-3">
                                        <Settings2 className="shrink-0" />
                                        <p className="-mt-0.5">
                                            Сбор полной анкеты кандидата, включая специальные навыки, опыт работы,
                                            опыт работы в Европе, возраст, занятость, местоположение, готовность к выполнению работ, и другое.
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-start gap-3">
                                        <Blocks className="shrink-0" />
                                        <p className="-mt-0.5">
                                            Подбор максимально подходящей вакансии, проверка на соответствие требованиям кандидату.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                            <Button className="mt-12 w-full">
                                Подробнее <ArrowRight />
                            </Button>
                        </div>
                        {/* Card 3 */}
                        <div className=" rounded-xl pt-6 md:pt-8 pb-6 px-6 col-span-1 md:col-span-2 lg:col-span-1">
                            {/* Media 3 Mobile */}
                            <div className="md:hidden mb-6  w-full bg-background border rounded-xl">
                                <Image src={'/partners/successful-meeting.jpg'} width={350} height={350} alt="searchPeople"
                                    className="rounded-xl"
                                />
                            </div>
                            <span className="text-2xl font-semibold tracking-tight">
                                Собеседование с куратором объекта
                            </span>
                            <ul className="mt-6 space-y-4">
                                <li>
                                    <div className="flex items-start gap-3">
                                        <Settings2 className="shrink-0" />
                                        <p className="-mt-0.5">
                                            За каждым партнёром закреплён собственный менеджер,
                                            он знает всю детальную информацию о представленных работах и необходимых сотрудниках.
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-start gap-3">
                                        <Blocks className="shrink-0" />
                                        <p className="-mt-0.5">
                                        В ходе этого собеседования, менеджер окончательно определяет квалификацию работника,
                                        оценивает комуникацию кандидата, возможности долгосрочного сотрудничевства, возможные форс-мажоры.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                            <Button className="mt-12 w-full">
                                Ознакомиться подробнее <ArrowRight />
                            </Button>
                        </div>
                        {/* Media 3 Desktop */}
                        <div className="hidden md:flex justify-end col-span-1 md:col-span-3 lg:col-span-2">
                            <div className="w-fit my-auto">
                                <Image
                                    src={'/partners/successful-meeting.jpg'}
                                    width={450}
                                    height={450}
                                    alt="searchPeople"
                                    className="rounded-xl"
                                />
                            </div>
                        </div>
                         {/* Media 2 Desktop */}
                         <div className="hidden md:block my-auto col-span-1 md:col-span-3 lg:col-span-2">
                            <Image src={'/partners/19612.jpg'} width={450} height={450} alt="searchPeople"
                                className="rounded-xl"
                            />
                        </div>
                        {/* Card 2 */}
                        <div className="rounded-xl pt-6 md:pt-8 pb-6 px-6 col-span-1 md:col-span-2 lg:col-span-1">
                            {/* Media 2 Mobile */}
                            <div className="md:hidden mb-6  w-fit rounded-xl">
                                <Image src={'/partners/19612.jpg'} width={450} height={450} alt="searchPeople"
                                    className="rounded-xl"
                                />
                            </div>
                            <span className="text-2xl font-semibold tracking-tight">
                                Собеседование с партнёром, согласование выезда 
                            </span>
                            <ul className="mt-6 space-y-4">
                                <li>
                                    <div className="flex items-start gap-3">
                                        <Settings2 className="shrink-0" />
                                        <p className="-mt-0.5">
                                            Передаём анкету кандидата партнёру,
                                            согласовываем дату и порядок собеседования.
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-start gap-3">
                                        <Blocks className="shrink-0" />
                                        <p className="-mt-0.5">
                                        В ходе последнего собеседования, партнёр определяет квалификацию работника,
                                        согласовывается дата прибытия на объект.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                            <Button className="mt-12 w-full">
                                Подробнее <ArrowRight />
                            </Button>
                        </div>
                       
                    </div>
                </div>
            </div>
            
            <div className="max-w-screen-sm mx-auto py-12 md:py-20 px-6">
            <h2 className="text-3xl mb-5 leading-10 sm:text-4xl md:text-[40px] md:leading-[3.25rem] font-bold tracking-tight">
                Документы работника <br />
                Сроки изготовления:
                    </h2>
                <div className="relative ml-3">
                    {/* Timeline line */}
                    <div className="absolute left-0 top-4 bottom-0 border-l-2" />
                    {experiences.map(
                        ({ company, description, period, technologies, title }, index) => (
                            <div key={index} className="relative pl-8 pb-12 last:pb-0">
                                {/* Timeline dot */}
                                <div className="absolute h-3 w-3 -translate-x-1/2 left-px top-3 rounded-full border-2 border-primary bg-background" />
                                {/* Content */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-shrink-0 h-9 w-9 bg-accent rounded-full flex items-center justify-center">
                                            <Building2 className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <span className="text-base sm:text-lg font-semibold">
                                            {company}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-medium">{title}</h3>
                                        <div className="flex items-center gap-2 mt-1 text-sm">
                                            <Calendar className="h-4 w-4" />
                                            <span>{period}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm sm:text-base text-muted-foreground">
                                        {description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {technologies.map((tech) => (
                                            <Badge
                                                key={tech}
                                                variant="secondary"
                                                className="rounded-full"
                                            >
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>

            <div className=" flex flex-col items-center justify-center py-12 px-6">
                <h1 className="text-5xl font-bold text-center tracking-tight">Возможные контракты</h1>
                <div className="mt-12 max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div key={plan.name} className="border rounded-lg p-6">
                            <h3 className="text-lg font-medium">{plan.name}</h3>
                            <p className="mt-2 text-4xl font-bold">{plan.price}€</p>
                            <p className="mt-4 font-medium text-muted-foreground">
                                {plan.description}
                            </p>
                            <Separator className="my-4" />
                            <ul className="space-y-2">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-2">
                                        <CircleCheck className="h-4 w-4 mt-1 text-green-600" />{" "}
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Button
                                variant={plan.isPopular ? "default" : "outline"}
                                size="lg"
                                className="w-full mt-6"
                            >
                                {plan.buttonText}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
            <div className=" flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-screen-lg">
                    <h2 className="text-4xl md:text-5xl !leading-[1.15] font-bold tracking-tight">
                        Часто задаваемые вопросы
                    </h2>
                    <div className="mt-6 w-full grid md:grid-cols-2 gap-x-10">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                            value={value}
                            onValueChange={setValue}
                        >
                            {faq.slice(0, 5).map(({ question, answer }, index) => (
                                <AccordionItem key={question} value={`question-${index}`}>
                                    <AccordionTrigger
                                        className="flex flex-1 items-center justify-between py-4 font-semibold transition-all hover:underline [&[data-state=open]>svg]:rotate-45"
                                    >
                                        {question}
                                    </AccordionTrigger>
                                    {/* <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" /> */}
                                    <AccordionContent>{answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                            value={value}
                            onValueChange={setValue}
                        >
                            {faq.slice(5).map(({ question, answer }, index) => (
                                <AccordionItem key={question} value={`question-${index + 5}`}>
                                    <AccordionTrigger
                                        className="flex flex-1 items-center justify-between py-4 font-semibold tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45" >
                                        {question}
                                        {/* <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" /> */}
                                    </AccordionTrigger>

                                    <AccordionContent>{answer}</AccordionContent>

                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
            <div className=" flex items-center justify-center">
                <div className="text-center">
                    <b className="text-muted-foreground">Наши контакты</b>
                    <h2 className="mt-3 text-2xl md:text-4xl font-bold tracking-tight">
                    Связаться
                    </h2>
                    <p className="mt-4 text-base sm:text-lg">
                    Наша дружная команда всегда готова поболтать.
                    </p>
                    <div className="max-w-screen-xl mx-auto py-24 grid md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-10 px-6 md:px-0">
                        <div className="text-center flex flex-col items-center">
                            <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                                <MailIcon />
                            </div>
                            <h3 className="mt-6 font-semibold text-xl">Почта</h3>
                            <p className="mt-2 text-muted-foreground">
                            Наша дружная команда всегда готова вам помочь.
                            </p>
                            <Link
                                className="mt-4 font-medium text-primary"
                                href="mailto:akashmoradiya3444@gmail.com"
                            >
                                support@etalones.com
                            </Link>
                        </div>
                        <div className="text-center flex flex-col items-center">
                            <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                                <MapPinIcon />
                            </div>
                            <h3 className="mt-6 font-semibold text-xl">Офис</h3>
                            <p className="mt-2 text-muted-foreground">
                            Приходите поздороваться в наш офис.
                            </p>
                            <Link
                                className="mt-4 font-medium text-primary"
                                href="https://map.google.com"
                                target="_blank"
                            >
                                Ulica Henryka Dobrzańskiego „Hubala” 22D<br />01-473 Warszawa
                            </Link>
                        </div>
                        <div className="text-center flex flex-col items-center">
                            <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                                <PhoneIcon />
                            </div>
                            <h3 className="mt-6 font-semibold text-xl">Телефон</h3>
                            <p className="mt-2 text-muted-foreground">Пн-Пт с 8:00 до 17:00.</p>
                            <Link
                                className="mt-4 font-medium text-primary"
                                href="tel:akashmoradiya3444@gmail.com"
                            >
                                +373 (69) 460-354
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Partners;
