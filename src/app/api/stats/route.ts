import {  NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Vacancies from '@/models/Vacancies';

export async function GET() {
  await connectDB();

  try {
    // Подсчет количества вакансий
    const vacancyCount = await Vacancies.find().countDocuments();

    // Получаем все вакансии с полем 'place'
    const vacancies = await Vacancies.find().select('place');

    // Суммирование количества свободных мест
    let place = 0;
    

    vacancies.forEach((vacancy: any) => {
      const vacancyPlace = Number(vacancy.place);
      

      
      // Если значение корректное (не NaN), добавляем его к общей сумме
      if (!isNaN(vacancyPlace)) {
        place += vacancyPlace;
      }
    });


    return NextResponse.json({ vacancyCount, place });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}
