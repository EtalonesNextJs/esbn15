'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { sendMessage } from "@/app/api/telegram/telegram";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";  // Импортируем toast

export default function FormCallBack() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        time: '',
        currentPage: '', 
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);  // Состояние для блокировки после отправки

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            currentPage: window.location.href 
        }));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Если форма уже отправлена, не отправляем повторно
        if (isSubmitted) return;

        // Блокируем кнопку отправки
        setIsSubmitted(true);

        const { name, phone, time, currentPage } = formData;

        // Проверка на пустые поля
        if (!name.trim()) {
            setErrors({ ...errors, name: 'Введите имя' });
            setIsSubmitted(false);  // Разблокируем кнопку
            return;
        }
        if (!phone.trim()) {
            setErrors({ ...errors, phone: 'Введите телефон' });
            setIsSubmitted(false);  // Разблокируем кнопку
            return;
        }
        if (!time.trim()) {
            setErrors({ ...errors, time: 'Выберите время звонка' });
            setIsSubmitted(false);  // Разблокируем кнопку
            return;
        }

        try {
            const message = `Имя: ${name}\nТелефон: ${phone}\nВремя звонка: ${time}\nСтраница: ${currentPage}`;
            await sendMessage(message);

            const body = { name, phone, time, source: 'сайт' };

            const response = await fetch('/api/candidates', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const result = await response.json();

            if (response.ok) {
                toast("Запрос на звонок отправлен и сохранен в базу данных!", {
                    description: "Ваш запрос был успешно отправлен.",
                    duration: 3000,  // Устанавливаем длительность отображения
                });
                setFormData({ name: '', phone: '', time: '', currentPage: '' });
            } else {
                setErrors({ ...errors, name: result.message || 'Ошибка при сохранении в базу данных' });
            }
        } catch (error) {
            setErrors({ ...errors, name: 'Ошибка при отправке сообщения или сохранении в базу данных' });
            console.error('Error:', error);
        }
    };

    return (
        <div className="px-10 py-5 bg-secondary">
            <div className=" ">
                <h3 className="text-2xl text-center">Оставьте свой номер телефона и мы сразу свяжемся с Вами.</h3>
                <p className="text-center mb-2">Назначьте время разговора с нами и мы поможем Вам выбрать вакансию и ответим на Ваши вопросы.</p>
                <form onSubmit={handleSubmit} className="grid md:grid-cols-8 mx-auto gap-4 w-full items-center justify-items-center">
                    <div />
                    <div />
                    <Input 
                        className="input input-bordered" 
                        placeholder="Имя" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange} 
                    />
                    <Input 
                        className="input input-bordered" 
                        placeholder="Номер телефона" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange} 
                    />
                    <Select value={formData.time} onValueChange={(value) => setFormData({
                        ...formData,
                        time: value,
                    })}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Время звонка" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Время</SelectLabel>
                                <SelectItem value="8:00-10:00">8:00-10:00</SelectItem>
                                <SelectItem value="10:00-12:00">10:00-12:00</SelectItem>
                                <SelectItem value="12:00-14:00">12:00-14:00</SelectItem>
                                <SelectItem value="14:00-16:00">14:00-16:00</SelectItem>
                                <SelectItem value="16:00-18:00">16:00-18:00</SelectItem>
                                <SelectItem value="После работы">После работы</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.time && <span className="text-red-500">{errors.time}</span>}
                    <Button type="submit" disabled={isSubmitted}> {/* Кнопка блокируется после отправки */}
                        Заказать звонок
                    </Button>
                </form>
            </div>
        </div>
    );
}
