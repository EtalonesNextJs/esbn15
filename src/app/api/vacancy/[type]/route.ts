import { getVacanciesByType } from '@/lib/api/vacancyService';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { type: string } }) {
  const { type } = params;

  const allowedTypes = ['all', 'new', 'indor', 'outdor', 'electric', 'sanitary'];
  if (!allowedTypes.includes(type)) {
    return NextResponse.json({ error: 'Unknown type' }, { status: 400 });
  }

  try {
    const vacancies = await getVacanciesByType(type);
    return NextResponse.json(vacancies);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
