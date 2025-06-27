import { connectDB } from '@/lib/db'
import Vacancies from '@/models/Vacancies'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    await connectDB()
    const { type } = await params

    const vacancies = await Vacancies.find({ category: type })

    return NextResponse.json(vacancies)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Ошибка при получении вакансий по категории' },
      { status: 500 }
    )
  }
}
