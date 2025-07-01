'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { toast } from 'sonner';

import { sendEmailAction } from '../actions/send-email';
import { Button } from './button';
import { Icons } from './icons';
import { SectionHeading } from './section-heading';
import { useSectionInView } from '@/components/VacancyDescription/hooks/use-section-in-view';
import { formSchema, TFormSchema } from '../lib/form-schema';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { sendMessage } from '@/app/api/telegram/telegram';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MultiSelect from '@/components/Multiselect/Multiselect';

export const Contact = ({vacancy}: any) => {
  const { ref } = useSectionInView('Анкета');

 const [formData, setFormData] = useState({
    name: '',
    phone: '',
    profession: {
      name: vacancy?.title,
      expirience: ''
    },
    documents: [],
    manager: vacancy?.manager,
    vacancy: vacancy,
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState<any[]>([]);


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

    const { name, phone, profession } = formData;

    // Проверка на пустые поля
    if (!name.trim()) {
      setErrors({ ...errors, name: 'Введите имя' });
      setIsSubmitted(false); // Разблокируем кнопку
      return;
    }
    if (!phone.trim()) {
      setErrors({ ...errors, phone: 'Введите телефон' });
      setIsSubmitted(false); // Разблокируем кнопку
      return;
    }
    if (!profession.expirience.trim()) {
      setErrors({ ...errors, expirience: 'Выберите опыт работы' });
      setIsSubmitted(false); // Разблокируем кнопку
      return;
    }
   

    try {
      // Сообщение для Telegram
      const telegramMessage = `Имя: ${name}
Телефон: ${phone}
Вакансия: ${vacancy?.title}
Город: ${vacancy?.location}
Куратор: ${vacancy?.manager?.name}
Опыт работы по профессии: ${profession.expirience}
Документы: ${selectedDocuments.map((doc) => doc.value).join(', ')}`;

      await sendMessage(telegramMessage);

      // Формирование данных для базы данных
      const body = {
        name,
        phone,
        profession: {
          name: vacancy?.title,
          expirience: profession.expirience
        },
        documents: selectedDocuments.map(doc => ({ name: doc.value })),
        manager: vacancy?.manager,
        vacancy: vacancy
      };

      const response = await fetch('/api/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const result = await response.json();

      if (response.ok) {
        toast("Запрос на звонок отправлен и сохранен в базу данных!", {
          description: "Ваш запрос был успешно отправлен.",
          duration: 3000,
        });
        setFormData({
          name: '',
          phone: '',
          profession: { name: vacancy?.title, expirience: '' },
          documents: [],
          manager: vacancy?.manager,
          vacancy: vacancy
        });
        setSelectedDocuments([]);
       
      } else {
        setErrors({ ...errors, name: result.message || 'Ошибка при сохранении в базу данных' });
      }
    } catch (error) {
      setErrors({ ...errors, name: 'Ошибка при отправке сообщения или сохранении в базу данных' });
      console.error('Error:', error);
    }
  };
  return (
    <motion.section
      ref={ref}
      id="contact"
      className="my-10 w-full scroll-mt-28 md:mb-20"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading
        heading="Анкетирование на сайте"
        content={
          <>
            Отправьте ваше резюме на почту{' '}
            <Button
              variant="link"
              className="text-muted-foreground hover:text-foreground h-fit p-0 font-medium underline transition-colors"
              asChild
            >
              <Link href="mailto:info@etalones.com">
                info@etalones.com
              </Link>
            </Button>{' '}
            или заполните эту форму.
          </>
        }
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5"
      >
        <div className="grid gap-4">
        <div className="flex flex-col items-start gap-1 bg-gray-100 rounded-md pt-2 px-1 pb-1">
          <Label htmlFor="name" className="text-right">
            Имя: <span className="font-light text-sm text-gray-600">*Ваше имя</span>
          </Label>
          <Input
            placeholder="Имя"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="col-span-3 bg-white"
          />
        </div>
        <div className="flex flex-col items-start gap-1 bg-gray-100 rounded-md pt-2 px-1 pb-1">
          <Label htmlFor="phone" className="text-left">
            Номер телефона: <span className="font-light text-sm text-left text-gray-600">*Номер указаный в меседжерах Viber, WhatsApp, Telegram.</span>
          </Label>
          <Input
            placeholder="Телефон"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            id="phone"
            className="col-span-3 bg-white"
          />
        </div>
        <div className="flex flex-col items-start gap-1 bg-gray-100 rounded-md pt-2 px-1 pb-1">
          <Label htmlFor="expirience" className="text-left">
            Опыт работы: <span className="font-light text-sm text-left text-gray-600">Опыт работы по профессии {vacancy?.title}</span>
          </Label>
          <Select
            name="expirience"
            value={formData.profession.expirience}
            onValueChange={(value) => setFormData({
              ...formData,
              profession: { ...formData.profession, expirience: value }
            })}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Без опыта" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Меньше года">Меньше года</SelectItem>
              <SelectItem value="1 год">1 год</SelectItem>
              <SelectItem value="2 года">2 года</SelectItem>
              <SelectItem value="3 года">3 года</SelectItem>
              <SelectItem value="4 года">4 года</SelectItem>
              <SelectItem value="5 лет">5 лет</SelectItem>
              <SelectItem value="Более 5 лет">Более 5 лет</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col items-start gap-1">
          <Label htmlFor="documents" className="text-left">
            Документы: <span className="font-light text-sm text-left text-gray-600">*Разрешающие работу в Европе.</span>
          </Label>
          <MultiSelect selected={selectedDocuments} setSelected={setSelectedDocuments} />
        </div>
      </div>
         
        <Button size="lg" className="bg-[#116948]" type="submit" disabled={isSubmitted}>
        {isSubmitted ? "Ваша заявка уже отправлена" : "Отправить"}
        </Button>
        {/* <div className="w-full max-w-xl">
          <label
            htmlFor="email"
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              
            )}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="hello@gmail.com"
            className={cn(
              'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring mt-2 flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            )}
          />
         
        </div>
        <div className="w-full max-w-xl">
          <label
            htmlFor="message"
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            )}
          >
            Message
          </label>
          <textarea
            id="message"
            placeholder="Hello! What's up?"
            className={cn(
              'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring mt-2 flex h-60 w-full resize-none rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            )}
          ></textarea>
          
        </div>
        <Button size="lg">
          Submit <Icons.arrowRight className="ml-2 size-4" />
        </Button> */}
      </form>
    </motion.section>
  );
};
