// import { NextRequest, NextResponse } from 'next/server';
// import { connectDB } from '@/lib/db';
// import Blog from '@/models/Blog';

// interface CategoryCount {
//       name: string;
//       totalPosts: number;
//     }

    
// export async function GET(request: NextRequest) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(request.url);
//     const category = searchParams.get('category');

//     // Фильтр для запроса
//     const filter: any = { status: 'published' };
//     if (category) {
//       filter.category = category;
//     }

//     // Получаем посты с фильтром
//     const posts = await Blog.find(filter)
//       .select('title slug category publishedAt description')
//       .sort({ publishedAt: -1 })
//       .lean();

//     // Если фильтр не установлен (получаем все посты), то считаем категории
    

//     let categories: CategoryCount[] = [];
//     if (!category) {
//       const categoryCountMap: Record<string, number> = {};
//       posts.forEach((post) => {
//         if (post.category) {
//           categoryCountMap[post.category] = (categoryCountMap[post.category] || 0) + 1;
//         }
//       });
//       categories = Object.entries(categoryCountMap).map(([name, totalPosts]) => ({
//         name,
//         totalPosts,
//       }));
//     }

//     return NextResponse.json({
//       posts,
//       categories,
//     });
//   } catch (error) {
//     console.error('[API] Ошибка в обработке запроса:', error);
//     return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
//   }
// }
// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || '';

    let filter: any = { status: 'published' };
    if (category) {
      filter.category = category;
    }

    const posts = await Blog.find(filter)
      .select('title slug category publishedAt description')
      .sort({ publishedAt: -1 })
      .lean();

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('API/posts error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
