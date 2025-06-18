import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Vacancies from '@/models/Vacancies';

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    if (!city) {
      return NextResponse.json(
        { error: 'Query parameter "city" is required' },
        { status: 400 }
      );
    }

    // Поиск вакансий по городу (регистр игнорируем)
    const vacancies = await Vacancies.find({
      city: { $regex: new RegExp(`^${city}$`, 'i') },
    }).lean();

    return NextResponse.json(vacancies);
  } catch (error) {
    console.error('Error fetching vacancies by city:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
