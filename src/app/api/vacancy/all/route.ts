import { connectDB } from '@/lib/db';
import Stage from '@/models/Stage';

export const GET = async (request: Request): Promise<Response> => {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'all'; 
  const limit = searchParams.get('limit'); 

  const stageId = process.env[`STAGE_${type?.toUpperCase()}`];

  if (!stageId) {
    return new Response(JSON.stringify({ error: 'Неверный или отсутствующий тип' }), { status: 400 });
  }

  const stage = await Stage.findById(stageId)
    .populate({
      path: 'vacancy',
      select: 'title place skills roof_type location salary homePrice home_descr work_descr grafik drivePermis langue workHours documents slug imageFB homeImageFB manager',
      populate: {
        path: 'manager',  
        select: 'name phone viber telegram whatsapp',  
      },
    });

  if (!stage) {
    return new Response(JSON.stringify({ error: 'Стадия не найдена' }), { status: 404 });
  }

  const vacancies = stage.vacancy || [];
  const limitedVacancies = limit ? vacancies.slice(0, parseInt(limit)) : vacancies;

  return new Response(JSON.stringify(limitedVacancies), { status: 200 });
};
