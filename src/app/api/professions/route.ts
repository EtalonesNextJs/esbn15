import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Profession from '@/models/Profession';

export async function GET() {
  await connectDB();

  // Получаем уникальные профессии (title) из вакансий
const professions = await Profession.find({}, { _id: 1, name: 1 }).sort({ name: 1 });
  return NextResponse.json(professions);
}
