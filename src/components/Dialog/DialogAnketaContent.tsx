// 'use client'
// import {  DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// import { Label } from "@/components/ui/label";
// import { Button } from "../ui/button";
// import { DialogHeader, DialogFooter } from "../ui/dialog";
// import { Input } from "../ui/input";
// import MultiSelect from "../Multiselect/Multiselect";
// import { sendMessage } from "@/app/api/telegram/telegram";
// import { useState, useEffect } from "react";
// import { toast } from "sonner";

// export default function DialogAnketaContent({vacancy}:any) {
//   const [formData, setFormData] = useState({
//           name: '',
//           phone: '',
//           expirience: '',
//           documents: [
            
//           ],
//       });
//       const [errors, setErrors] = useState<{ [key: string]: string }>({});
//       const [isSubmitted, setIsSubmitted] = useState(false);  // Состояние для блокировки после отправки
//       const [selectedDocuments, setSelectedDocuments] = useState<any[]>([]);

// console.log("DOCS",selectedDocuments);
      
//       useEffect(() => {
//           setFormData((prevData) => ({
//               ...prevData,
//               currentPage: window.location.href 
//           }));
//       }, []);
  
//       const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//           setFormData({
//               ...formData,
//               [e.target.name]: e.target.value
//           });
//           setErrors({
//               ...errors,
//               [e.target.name]: ''
//           });
//       };
  
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Если форма уже отправлена, не отправляем повторно
//     if (isSubmitted) return;

//     // Блокируем кнопку отправки
//     setIsSubmitted(true);

//     const { name, phone, expirience, documents, } = formData;

//     // Проверка на пустые поля
//     if (!name.trim()) {
//         setErrors({ ...errors, name: 'Введите имя' });
//         setIsSubmitted(false);  // Разблокируем кнопку
//         return;
//     }
//     if (!phone.trim()) {
//         setErrors({ ...errors, phone: 'Введите телефон' });
//         setIsSubmitted(false);  // Разблокируем кнопку
//         return;
//     }
//     if (!expirience.trim()) {
//         setErrors({ ...errors, time: 'Выберите опыт работы' });
//         setIsSubmitted(false);  // Разблокируем кнопку
//         return;
//     }

//     try {
//         const message = `Имя: ${name}
//         \nТелефон: ${phone}
//         \nВакансия: ${vacancy?.title}
//         \nГород: ${vacancy?.location}
//         \nКуратор: ${vacancy?.manager?.name}
//         \nОпыт работы по профессии: ${expirience}
//         \nДокументы: ${selectedDocuments.map((doc) => doc.value)}
//         `;
//         await sendMessage(message);

//         const body = { name, phone, expirience, documents, source: 'сайт' };

//         const response = await fetch('/api/candidates', { 
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(body)
//         });

//         const result = await response.json();

//         if (response.ok) {
//             toast("Запрос на звонок отправлен и сохранен в базу данных!", {
//                 description: "Ваш запрос был успешно отправлен.",
//                 duration: 3000,  // Устанавливаем длительность отображения
//             });
//             setFormData({ name: '', phone: '', expirience: '',  documents: [] });
//         } else {
//             setErrors({ ...errors, name: result.message || 'Ошибка при сохранении в базу данных' });
//         }
//     } catch (error) {
//         setErrors({ ...errors, name: 'Ошибка при отправке сообщения или сохранении в базу данных' });
//         console.error('Error:', error);
//     }
// };
//   return (
//     <form onSubmit={handleSubmit}><DialogHeader>
//       <DialogTitle>Отправить заявку</DialogTitle>
//       <DialogDescription>
//         Укажите пожалуйста свой номер телефона и имя для отправки заявки.
//       </DialogDescription>
//     </DialogHeader><div className="grid gap-4 ">
//         <div className="flex flex-col items-start gap-1 bg-gray-100 rounded-md pt-2 px-1 pb-1">
//           <Label htmlFor="name" className="text-right">
//             Имя: <span className="font-light text-sm text-gray-600">*Ваше имя</span>
//           </Label>
//           <Input  placeholder="Имя" 
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange} 
//                         className="col-span-3 bg-white" />
//         </div>
//         <div className="flex flex-col items-start gap-1 bg-gray-100 rounded-md pt-2 px-1 pb-1">
//           <Label htmlFor="phone" className="text-left">
//             Номер телефона: <span className="font-light text-sm text-left text-gray-600">*Номер указаный в меседжерах Viber, WhatsApp, Telegram.</span>
//           </Label>
//           <Input  placeholder="Телефон" 
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange} 
//           id="phone"  className="col-span-3 bg-white" />
//         </div>
//         <div className="flex flex-col items-start gap-1 bg-gray-100 rounded-md pt-2 px-1 pb-1">
//           <Label htmlFor="username" className="text-left">
//             Опыт работы: <span className="font-light text-sm text-left text-gray-600 bg-gray-100 rounded-md pt-2 px-1 pb-1">Опыт работы по профессии {vacancy?.title}</span>
//           </Label>
//           <Select       name="expirience"
//                         value={formData.expirience} 
//                         onValueChange={(value) => setFormData({
//                           ...formData,
//                           expirience: value,
//                       })} >
//   <SelectTrigger className="w-full bg-white">
//     <SelectValue placeholder="Без опыта" />
//   </SelectTrigger>
//   <SelectContent>
//     <SelectItem value="Меньше года">Меньше года</SelectItem>
//     <SelectItem value="1 год">1 год</SelectItem>
//     <SelectItem value="2 года">2 года</SelectItem>
//     <SelectItem value="3 года">3 года</SelectItem>
//     <SelectItem value="4 года">4 года</SelectItem>
//     <SelectItem value="5 лет">5 лет</SelectItem>
//     <SelectItem value="Более 5 лет">Более 5 лет</SelectItem>
//   </SelectContent>
// </Select>

//         </div>
//         <div className="flex flex-col items-start gap-1 ">
//         <Label htmlFor="documents" className="text-left">
//             Документы: <span className="font-light text-sm text-left text-gray-600">*Разрешающие работу в Европе.</span>
//           </Label>
//         <MultiSelect selected={selectedDocuments} setSelected={setSelectedDocuments}/>
//         </div>
       
//       </div><DialogFooter>
//       <DialogClose asChild>
//             <Button type="button" className="bg-red-800 hover:bg-red-700 text-white transition-all duration-200 ease-in-out">
//               Закрыть
//             </Button>
//           </DialogClose>        
//           <Button className="bg-[#116948]" type="submit">Отправить</Button>
//       </DialogFooter></form>
//   )
//   }
'use client'
import { DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import MultiSelect from "../Multiselect/Multiselect";
import { sendMessage } from "@/app/api/telegram/telegram";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function DialogAnketaContent({ vacancy, setOpen}: any) {
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

  console.log("Selected Documents", selectedDocuments);

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
        setOpen(false);
      } else {
        setErrors({ ...errors, name: result.message || 'Ошибка при сохранении в базу данных' });
      }
    } catch (error) {
      setErrors({ ...errors, name: 'Ошибка при отправке сообщения или сохранении в базу данных' });
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Отправить заявку</DialogTitle>
        <DialogDescription>
          Укажите пожалуйста свой номер телефона и имя для отправки заявки.
        </DialogDescription>
      </DialogHeader>
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
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" className="bg-red-800 hover:bg-red-700 text-white transition-all duration-200 ease-in-out">
            Закрыть
          </Button>
        </DialogClose>
        <Button className="bg-[#116948]" type="submit" disabled={isSubmitted}>
        {isSubmitted ? "Ваша заявка уже отправлена" : "Отправить"}
        </Button>
      </DialogFooter>
    </form>
  );
}
