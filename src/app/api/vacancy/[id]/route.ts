import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Vacancies from '@/models/Vacancies';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // 👈 params — это **Promise**
) {
  try {
    await connectDB();

    const { id } = await context.params; // 👈 Обязательное await

    console.log('ID из params:', id);

    const vacancy = await Vacancies.findById(id).populate('manager');

    if (!vacancy) {
      return NextResponse.json({ error: 'Вакансия не найдена' }, { status: 404 });
    }

    return NextResponse.json(vacancy);
  } catch (error: any) {
    return NextResponse.json(
      { error: `Ошибка при получении вакансии: ${error.message}` },
      { status: 500 }
    );
  }
}
