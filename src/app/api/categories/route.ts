// app/api/categories/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';

export async function GET() {
  try {
    await connectDB();

    const posts = await Blog.find({ status: 'published' }).select('category').lean();

    const counts: Record<string, number> = {};
    posts.forEach((p) => {
      if (p.category) counts[p.category] = (counts[p.category] || 0) + 1;
    });

    const categories = Object.entries(counts).map(([name, totalPosts]) => ({ name, totalPosts }));

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('API/categories error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
