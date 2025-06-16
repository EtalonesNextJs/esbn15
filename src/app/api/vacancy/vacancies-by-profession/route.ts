// /app/api/vacancies-by-profession/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Vacancies from '@/models/Vacancies';

export async function GET(request: Request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const profession = searchParams.get('profession');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  if (!profession) {
    return NextResponse.json({ error: 'Profession required' }, { status: 400 });
  }

  const filter = { title: { $regex: new RegExp(profession, 'i') } };

  const totalCount = await Vacancies.countDocuments(filter);
  const vacancies = await Vacancies.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return NextResponse.json({ vacancies, totalCount, page, limit });
}
