'use client'
import { useState } from "react";
import {Button} from "@/components/ui/button";
import { Input } from "../ui/input";
import { sendMessage } from "@/app/api/telegram/telegram";

export default function FormSubscribe() {
    const [formData, setFormData] = useState({
        email: '',
        consentEmails: true,
        consentJobAlerts: true,
        consentNews: true,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { email, consentEmails, consentJobAlerts, consentNews } = formData;

        if (!email.trim()) {
            setErrors({ ...errors, email: 'Введите email' });
            return;
        }

        try {
            const message = `
                Email: ${email}
                Согласие на получение электронных писем: ${consentEmails ? 'Да' : 'Нет'}
                Получать регулярные оповещения о новых предложениях работы: ${consentJobAlerts ? 'Да' : 'Нет'}
                Получать регулярные уведомления о актуальных новостях: ${consentNews ? 'Да' : 'Нет'}
            `;
            setIsLoading(true);
            await sendMessage(message);
            alert('Подписка оформлена!');
            setFormData({ email: '', consentEmails: true, consentJobAlerts: true, consentNews: true });
        } catch  {
            setErrors({ ...errors, email: 'Ошибка при отправке сообщения' });
        } finally {
            setIsLoading(false);
        }
    };
    
    if (isLoading) {
        return (
            <div className="bg-primary text-white">загрузка</div>
        );
    }

    return (
        <div className="bg-primary text-white">
            <h2 className="text-2xl text-center py-2">Активируй бесплатную подписку уже сейчас</h2>
            <div className="md:grid grid-cols-2 shadow-xl bg-gradient-red text-white">
                    <p className="text-center md:max-w-1/2 m-auto py-2">
                        Заполните короткую форму и присоединяйся к группе подписчиков, чтобы регулярно получать уведомления о новых предложениях работы и сообщения на твою электронную почту или смс.
                    </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="w-full flex gap-1">
                        <input 
                            type="checkbox" 
                            name="consentEmails"
                            checked={formData.consentEmails}
                            onChange={handleChange} 
                            className="checkbox" 
                        />
                        <p>Согласие на получение электронных писем</p>
                    </div>
                    <div className="w-full flex gap-1">
                        <input 
                            type="checkbox" 
                            name="consentJobAlerts"
                            checked={formData.consentJobAlerts}
                            onChange={handleChange} 
                            className="checkbox" 
                        />
                        <p>Получай регулярные оповещения о новых предложениях работы</p>
                    </div>
                    <div className="w-full flex gap-1">
                        <input 
                            type="checkbox" 
                            name="consentNews"
                            checked={formData.consentNews}
                            onChange={handleChange} 
                            className="checkbox" 
                        />
                        <p>Получай регулярные уведомления о актуальных новостях</p>
                    </div>
                    <div className="w-full flex gap-1 py-3">

                    <Input 
                        type="text" 
                        name="email"
                        placeholder="email@gmail.com"
                        className="bg-white text-black w-full max-w-xs" 
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="text-red-500">{errors.email}</span>}
                    <Button  className="bg-white text-primary hover:text-white hover:bg-primary hover:border-[#ffffff] w-max  md:mx-0">
                    Подписаться
                    </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
