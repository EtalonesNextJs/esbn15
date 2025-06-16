// import { NextRequest, NextResponse } from 'next/server';
// import Vacancies from '@/models/Vacancies';
// import { connectDB } from '@/lib/db';

// export async function GET(req: Request) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);
//     const type = searchParams.get('type') || 'all';
//     const offset = parseInt(searchParams.get('offset') || '0');
//     const limit = parseInt(searchParams.get('limit') || '10');

//     const query = type === 'all' ? {} : { type };
//     const total = await Vacancies.countDocuments(query);
//     const vacancies = await Vacancies.find(query).skip(offset).limit(limit).lean();

//     return NextResponse.json({ vacancies, total });
//   } catch (err) {
//     return NextResponse.json({ message: 'Ошибка загрузки вакансий', error: err }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Vacancies from "@/models/Vacancies";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    let page = parseInt(searchParams.get("page") || "1", 10);
    let limit = parseInt(searchParams.get("limit") || "10", 10);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1 || limit > 100) limit = 10; // ограничение max 100

    const filter: Record<string, any> = {};

    const category = searchParams.get("category");
    if (category) filter.category = category;

    const location = searchParams.get("location");
    if (location) filter.location = location;

    const salaryMin = searchParams.get("salaryMin");
    const salaryMax = searchParams.get("salaryMax");
    if (salaryMin || salaryMax) {
      filter.salary = {};
      if (salaryMin) filter.salary.$gte = Number(salaryMin);
      if (salaryMax) filter.salary.$lte = Number(salaryMax);
    }

    const schedule = searchParams.get("schedule");
    if (schedule) {
      const schedules = schedule.split(",").map(s => s.trim()).filter(Boolean);
      if (schedules.length > 0) filter.schedule = { $in: schedules };
    }

    const hasDocuments = searchParams.get("hasDocuments");
    if (hasDocuments === "true") {
      filter.documents = { $exists: true, $ne: [] }; // лучше так
    }

    const search = searchParams.get("search");
    if (search) {
      filter.$text = { $search: search };
    }

    const totalCount = await Vacancies.countDocuments(filter);

    const vacancies = await Vacancies.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({ vacancies, totalCount, page, limit });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Ошибка сервера" }, { status: 500 });
  }
}
