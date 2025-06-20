// // src/app/api/blog/generate-article/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";

// // ✅ Настройка OpenAI клиента (или импортируй из отдельного модуля, если хочешь)
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // ✅ POST handler
// export async function POST(request: NextRequest) {
//   try {
//     const { vacancyTitle, city } = await request.json();

//     // 🧪 Проверка входных данных
//     if (!vacancyTitle || !city) {
//       return NextResponse.json({ error: "Отсутствуют параметры." }, { status: 400 });
//     }

//     // 🧠 Промпт (можно вынести в шаблон отдельно, если хочешь переиспользовать)
//     const prompt = `
// Напиши SEO-оптимизированную статью на русском языке для строительной компании.
// Тема: вакансия "${vacancyTitle}" в городе "${city}".
// Статья должна быть оригинальной, полезной, и мотивировать кандидатов. Не дублируй описание вакансии.
// Освети: перспективы, преимущества жизни в городе, рабочие условия, мотивацию, карьерный рост.
// Структурируй статью с заголовками и абзацами.
// `;

//     // ⚡ Запрос к OpenAI
//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "system",
//           content: "Ты — SEO-копирайтер. Пишешь тексты для строительной компании в Европе.",
//         },
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//     });

//     // ✅ Возвращаем результат
//     const content = completion.choices[0]?.message?.content?.trim();
//     if (!content) {
//       return NextResponse.json({ error: "Пустой ответ от модели." }, { status: 500 });
//     }

//     return NextResponse.json({ content });
//   } catch (error: any) {
//     console.error("Ошибка генерации статьи:", error);
//     return NextResponse.json(
//       { error: "Ошибка генерации. Возможно, исчерпан лимит API или неверный ключ." },
//       { status: 500 }
//     );
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const vacancy = await request.json();

    // Проверка необходимых полей в объекте вакансии
    if (!vacancy.title || !vacancy.city || !vacancy.country) {
      return NextResponse.json({ error: "Отсутствуют обязательные параметры вакансии." }, { status: 400 });
    }

    const prompt = `
Ты — SEO-копирайтер. Используй следующие данные о вакансии, чтобы:

1. Сгенерировать семантическое ядро (10–15 ключевых поисковых фраз),
2. Написать SEO-оптимизированную статью на русском языке в формате Markdown с заголовками ###,
3. Вернуть готовый JSON-объект со структурой:

{
  "title": string,
  "slug": string,
  "description": string,
  "category": string,
  "tags": string[],
  "imageFB": string[],
  "content": [
    { "title": string, "content": string }
  ],
  "relatedVacancyIds": [],
  "city": string,
  "titleKeyword": string,
  "status": "published",
  "publishedAt": "ISO string",
  "keywords": string[] // семантическое ядро
}

---

💼 Вакансия: "${vacancy.title}"
📍 Город: ${vacancy.city}
🇩🇪 Страна: ${vacancy.country}
💶 Зарплата: ${vacancy.salary || "не указана"}
🏠 Жильё: ${vacancy.homePrice?.trim() || "не указано"} — ${vacancy.home_descr?.trim() || "не указано"}
📋 Обязанности: ${vacancy.work_descr?.trim() || "не указаны"}
🕘 График: ${vacancy.grafik || "не указан"}
🛠 Навыки: ${vacancy.skills || "не указаны"}
📑 Документы: ${(vacancy.documents && vacancy.documents.length > 0) ? vacancy.documents.join(", ") : "не указаны"}

Требования:
- Заголовок статьи должен быть броским и включать профессию и город.
- Используй теги в стиле ["работа", "вакансия", "город", "профессия", "Европа"].
- В поле description дай краткое привлекательное описание (1–2 строки).
- В поле content разбей на разделы:
  1. Обзор вакансии
  2. Навыки и обязанности
  3. Условия работы
  4. Необходимые документы
  5. Преимущества жизни и работы в городе ${vacancy.city}
- В поле slug сгенерируй ЧПУ на основе названия статьи.
- Верни только валидный JSON. Никаких дополнительных комментариев.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Ты — опытный SEO-копирайтер. Пишешь статьи в формате JSON для публикации на сайте.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content?.trim();

    if (!content) {
      return NextResponse.json({ error: "Пустой ответ от модели." }, { status: 500 });
    }

    try {
      const json = JSON.parse(content);
      return NextResponse.json(json);
    } catch (err) {
      console.error("❌ Ошибка парсинга JSON от GPT:", err);
      return NextResponse.json({ raw: content, error: "Невалидный JSON от GPT" }, { status: 500 });
    }

  } catch (error: any) {
    console.error("Ошибка генерации статьи:", error);
    return NextResponse.json(
      { error: "Ошибка генерации. Возможно, исчерпан лимит API или неверный ключ." },
      { status: 500 }
    );
  }
}
