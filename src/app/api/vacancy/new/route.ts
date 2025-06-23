import { connectDB } from '@/lib/db'
import Vacancies from '@/models/Vacancies'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Подключаемся к базе
    await connectDB()

    // Получаем дату месяц назад
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

    // Получаем только свежие вакансии
    const freshVacancies = await Vacancies.find({
      createdAt: { $gte: oneMonthAgo }
    }).sort({ createdAt: -1 })

    return NextResponse.json(freshVacancies)
  } catch (error) {
    console.error('[API] Ошибка получения свежих вакансий:', error)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
