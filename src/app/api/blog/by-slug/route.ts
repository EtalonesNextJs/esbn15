import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug не передан' }, { status: 400 });
    }

    const blogPost = await Blog.findOne({ slug, status: 'published' }).lean();

    if (!blogPost) {
      return NextResponse.json({ error: 'Статья не найдена' }, { status: 404 });
    }

    return NextResponse.json(blogPost);
  } catch (error) {
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}
