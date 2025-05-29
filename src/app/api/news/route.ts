
// import { NextRequest, NextResponse } from 'next/server';
// import { connectDB } from '@/lib/db';
// import News from '@/models/News';

// export const GET = async (request: NextRequest) => {
//   try {
//     await connectDB();
//     const { searchParams } = new URL(request.url);
//     const category = searchParams.get('category');

//     const query: { category?: string } = {};
//     if (category) query.category = category;

//     const news = await News.find(query).sort({ createdAt: -1 });
//     const response = { news };

//     return new NextResponse(JSON.stringify(response), { status: 200 });
//   } catch (error) {
//     console.error("Error in fetching:", error);
//     return new NextResponse("Error in fetching: " + error, { status: 500 });
//   }
// };
import { connectDB } from '@/lib/db';
import News from '@/models/News';

export const GET = async (request: Request): Promise<Response> => {
  try {
    console.log('Connecting to the database...');
    await connectDB(); // Подключаемся к базе данных
    console.log('Database connected.');

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const limit = searchParams.get('limit');

    console.log('Request parameters:', { type, limit });

    // Проверяем переменную stageId
    const stageId = process.env[`STAGE_${type?.toUpperCase()}`];

    if (!stageId) {
      console.error('Invalid or missing stage type:', type);
      return new Response(JSON.stringify({ error: 'Неверный или отсутствующий тип' }), { status: 400 });
    }

    console.log('Stage ID:', stageId);

    const stage = await News.findById(stageId).populate({
      path: 'news',
      select: 'title', // Выбираем только нужные поля для новостей
    });

    if (!stage) {
      console.error('Stage not found for ID:', stageId);
      return new Response(JSON.stringify({ error: 'Стадия не найдена' }), { status: 404 });
    }


    const news = stage.news || [];  // Получаем новости из стадии

    const limitedNews = limit ? news.slice(0, parseInt(limit)) : news;  // Ограничиваем количество новостей

    return new Response(JSON.stringify(limitedNews), { status: 200 });
  } catch (error) {
    console.error('Error occurred:', error);
    return new Response(JSON.stringify({ error: 'Внутренняя ошибка сервера' }), { status: 500 });
  }
};
