import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Vacancies from '@/models/Vacancies';

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }  // вот здесь Promise
) {
   await connectDB();
  const { slug } = await context.params; // await params

  // теперь ищем вакансию по slug
  const vacancy = await Vacancies.findOne({ slug }) .populate('manager', 'name phone telegram viber whatsapp');

  if (!vacancy) {
    return new Response(JSON.stringify({ error: 'Вакансия не найдена' }), { status: 404 });
  }

  return new Response(JSON.stringify(vacancy));
}

