import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

// Получение статьи по slug через API
async function fetchBlogBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/by-slug?slug=${encodeURIComponent(slug)}`,
    { cache: 'no-store' }
  );

  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // await params, т.к. params - Promise
  const { slug } = await params; 

  const blog = await fetchBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Статья не найдена",
      description: "Такой статьи не существует или она была удалена.",
      robots: { index: false, follow: false },
    };
  }

  const cleanDescription = blog.description
    ? blog.description.replace(/<[^>]*>/g, "").slice(0, 160)
    : "";

  const url = `https://etalones.com/blog/${encodeURIComponent(slug)}`;

  return {
    title: `${blog.title} | Etalones Блог`,
    description: cleanDescription,
    openGraph: {
      title: blog.title,
      description: cleanDescription,
      type: "article",
      url,
      locale: "ru_RU",
      images: blog.imageFB.length > 0 ? blog.imageFB : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: cleanDescription,
      images: blog.imageFB.length > 0 ? blog.imageFB : undefined,
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      "og:type": "article",
      "og:site_name": "Etalones",
    },
  };
}


export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params; // await здесь тоже обязателен!

  const blog = await fetchBlogBySlug(slug);

  if (!blog) return notFound();

  return (
    <main className="max-w-screen-xl mx-auto p-5">
      <article>
        <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
        {blog.imageFB.length > 0 && (
          <img
            src={blog.imageFB[0]}
            alt={blog.title}
            className="mb-8 rounded-lg max-w-full"
          />
        )}
        <p className="mb-8 text-lg text-gray-700">{blog.description}</p>

        {blog.content.map((section: any, idx: number) => (
          <section key={idx} className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
            <p className="whitespace-pre-line leading-relaxed text-lg">
              {section.content}
            </p>
          </section>
        ))}
      </article>
    </main>
  );
}

