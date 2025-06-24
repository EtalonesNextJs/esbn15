import { NextResponse } from 'next/server';
import { getVacanciesByType } from '@/lib/api/vacancyService';
import type { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;

  const allowedTypes = ['all', 'new', 'indor', 'outdor', 'electric', 'sanitary'];
  if (!allowedTypes.includes(type)) {
    return NextResponse.json({ error: 'Unknown type' }, { status: 400 });
  }

  try {
    const vacancies = await getVacanciesByType(type);
    return NextResponse.json(vacancies);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
