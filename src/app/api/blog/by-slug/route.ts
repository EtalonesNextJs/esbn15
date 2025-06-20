import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';

export async function GET(request: NextRequest) {
  try {
    console.log('[API] Подключение к базе данных...');
    await connectDB();
    console.log('[API] Подключение успешно.');

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    console.log('[API] Полученный slug:', slug);

    if (!slug) {
      console.warn('[API] Ошибка: slug не передан');
      return NextResponse.json({ error: 'Slug не передан' }, { status: 400 });
    }

    console.log('[API] Поиск статьи в базе...');
    const blogPost = await Blog.findOne({ slug, status: 'published' }).lean();

    if (!blogPost) {
      console.warn('[API] Статья не найдена по slug:', slug);
      return NextResponse.json({ error: 'Статья не найдена' }, { status: 404 });
    }

    console.log('[API] Возвращаем статью');
    return NextResponse.json(blogPost);
  } catch (error) {
    console.error('[API] Ошибка в обработке запроса:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}
