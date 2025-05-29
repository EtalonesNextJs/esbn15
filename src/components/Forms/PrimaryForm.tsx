'use client'
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { toast } from "sonner";
import { sendMessage } from "@/app/api/telegram/telegram";
import { useState } from "react";

export default function PrimayForm({ setOpen }: { setOpen: (open: boolean) => void }) {
    const [isChecked, setIsChecked] = useState(false); 
    const [name, setName] = useState(""); 
    const [phone, setPhone] = useState(""); 
    const [professions, setProfessions] = useState("");
    const [formErrors, setFormErrors] = useState({
        name: false,
        phone: false,
        professions: false,
        checkbox: false,
    }); 
    const handleCheckboxChange = (checked: boolean) => {
        setIsChecked(checked); // Обновляем состояние чекбокса
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors = {
            name: !name,
            phone: !phone,
            professions: !professions,
            checkbox: !isChecked,
        };

        setFormErrors(errors);
        if (Object.values(errors).includes(true)) {
            toast("Пожалуйста, заполните все поля и согласитесь с политикой конфиденциальности.", {
                description: "Имя, телефон, профессия и согласие с политикой конфиденциальности обязательны.",
                duration: 3000,
            });
            return; // Прерываем выполнение, если есть ошибки
        }
        

       
        const formData = new FormData(event.currentTarget);

        const professionsString = formData.get("professions") as string;

        // Преобразуем строку профессий в строку, разделенную запятой
        let professionsArray: string[] = [];
        if (professionsString) {
            professionsArray = professionsString.split(",").map((profession) => profession.trim());
        }

        // Теперь передаем профессию как строку, а не объект
        const body = {
            name: formData.get('name') || '',
            phone: formData.get('phone') || '',
            profession: professionsArray.join(", "), // Передаем как строку через запятую
        };

        try {
            const telegramMessage = `Новый кандидат:
Имя: ${body.name}
Телефон: ${body.phone}
Профессия: ${body.profession}`;

            // Отправка сообщения в Telegram
            await sendMessage(telegramMessage);

            const response = await fetch('/api/candidates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const result = await response.json();
            if (response.ok) {
                console.log('Кандидат создан:', result);
                setOpen(false);
                toast("Ваша анкета сохранена в базу данных!", {
                    description: "Ваш запрос был успешно отправлен. В скором времени мы с вами свяжемся.",
                    duration: 3000,
                });
            } else {
                toast("Чтото пошло не так", {
                    description: "Оповестите пожалуйста администратора сайта, почта: support@etalones.com",
                    duration: 3000,
                });
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card className="bg-accent ">
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
                        <div className="col-span-2 sm:col-span-1">
                            <Label htmlFor="name">Имя</Label>
                            <Input
                            onChange={(e) => setName(e.target.value)} 
                            value={name}
                                placeholder="Имя"
                                id="name"
                                name="name"
                                className={`mt-1.5 bg-white ${formErrors.name ? "border-red-500" : name ? "border-green-500" : ""}`}
                            />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <Label htmlFor="phone">Телефон</Label>
                            <Input
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                                type='phone'
                                name="phone"
                                placeholder="Телефон"
                                id="lastName"
                                className={`mt-1.5 bg-white ${formErrors.phone ? "border-red-500" : phone ? "border-green-500" : ""}`}
                            />
                        </div>
                        <div className="col-span-2">
                            <Label htmlFor="professions">Профессия</Label>
                            <Input
                            onChange={(e) => setProfessions(e.target.value)}
                            value={professions}
                                type="text"
                                placeholder="Каменьщик, гипсокартонщик, маляр..."
                                id="professions"
                                name="professions"
                                className={`mt-1.5 bg-white ${formErrors.professions ? "border-red-500" : professions ? "border-green-500" : ""}`}                            />
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                            <Checkbox  id="acceptTerms"
                                checked={isChecked} // Управляем состоянием чекбокса
                                onCheckedChange={handleCheckboxChange}
                               className={formErrors.checkbox ? "border-red-500" : isChecked ? "border-green-500" : ""} />
                            <Label htmlFor="acceptTerms">
                                <Link href="/privacy" target="_blank" className="underline">
                                    Я соглашаюсь с {" "} политикой конфиденциальности сайта.
                                </Link>
                                .
                            </Label>
                        </div>
                    </div>
                    <DialogFooter className="mt-2 grid gap-2 grid-cols-2 items-center">
                        <Button type="submit" className=" w-full bg-[#116948] hover:bg-[#0F4D3A] text-white transition-all duration-200 ease-in-out">
                            Отправить
                        </Button>
                        <DialogClose asChild>
                            <Button type="button" size="lg">
                                Закрыть
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </CardContent>
            </Card>
        </form>
    );
}
