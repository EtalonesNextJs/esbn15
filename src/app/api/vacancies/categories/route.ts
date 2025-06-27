import { connectDB } from '@/lib/db'
import Vacancies from '@/models/Vacancies'
import { NextResponse } from 'next/server'


// Словарь для "человеческих" названий
const categoryNames: Record<string, string> = {
  beton: 'Бетонщик',
  kamen: 'Каменщики',
  electric: 'Электрик',
  indor: 'Внутренние работы',
  montazh: 'Монтажник',
  montazj: 'Монтажник (опечатка)',
  noexp: 'Без опыта',
  outdor: 'Наружные работы',
  santehnic: 'Сантехник',
  tehnic: 'Техник',
}

export async function GET() {
  try {
    await connectDB()
    
    const categories = await Vacancies.distinct('category')
    
    const formatted = categories
      .filter((cat: string | null) => cat) // убираем null
      .map((cat: string) => ({
        key: cat,
        name: categoryNames[cat] || cat  // если нет перевода — оставляем оригинал
      }))
    
    return NextResponse.json({ categories: formatted })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Ошибка при получении категорий' }, { status: 500 })
  }
}
