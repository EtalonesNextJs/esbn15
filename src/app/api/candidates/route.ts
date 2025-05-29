// import { NextResponse } from 'next/server';
// import { connectDB } from '@/lib/db';
// import Candidate from '@/models/Candidate';
// import Stage from '@/models/Stage';
// import EventLog from '@/models/EventLog';


// const STAGE_NEW = process.env.NEXT_PUBLIC_CANDIDATES_STAGE_NEW;

// export const POST = async (request: Request) => {
//   try {
//     const body = await request.json();
//     console.log("BODY", body);

//     const { name, phone, profession, documents, manager, vacancy } = body;

//     await connectDB();

//     // Проверяем, существует ли кандидат с таким номером телефона
//     const existingCandidate = await Candidate.findOne({ phone: body.phone });
//     if (existingCandidate) {
//       return new NextResponse(
//         JSON.stringify({
//           message: "Кандидат с таким номером телефона уже существует",
//         }),
//         {
//           status: 400,
//         }
//       );
//     }

//     // Преобразуем данные под структуру, соответствующую схеме MongoDB
//     const newCandidateData = {
//       source: 'сайт', 
//       name: name,
//       phone: phone,
//       manager: manager,
//       vacancy: vacancy,
//       professions: [
//         {
//           name: profession.name, 
//           experience: profession.expirience, 
//         },
//       ],
//       documents: documents ? documents.map((doc: any) => ({
//         docType: doc.name,
//         dateOfIssue: "",
//         dateExp: "",
//         numberDoc: "",
//       })) : [],
     
//     };

//     const newCandidate = new Candidate(newCandidateData);
//     await newCandidate.save();

//     const stageNewId = STAGE_NEW;
//     if (stageNewId) {
//       await Stage.findByIdAndUpdate(
//         stageNewId,
//         { $push: { candidates:{ $each: [newCandidate._id], $position: 0 }} },
//         { new: true }
//       );
//     }
//     const eventLog = new EventLog({
//       eventType: 'Добавлен кандидат',
//       relatedId: newCandidate._id,
//       description: `Добавлен новый кандидат с сайта Etalones.com: ${name}`,
//     });

//     await eventLog.save();
//     return new NextResponse(
//       JSON.stringify({ message: "Candidate is created", candidate: newCandidate }),
//       { status: 201 }
//     );
//   } catch (error: any) {
//     console.error('Error:', error);
//     return new NextResponse(
//       JSON.stringify({
//         message: "Error in creating user",
//         error: error.message || 'Unknown error',
//       }),
//       {
//         status: 500,
//       }
//     );
//   }
// };
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Candidate from '@/models/Candidate';
import Stage from '@/models/Stage';
import EventLog from '@/models/EventLog';
import { Profession } from '@/lib/types/interfaces';

const STAGE_NEW = process.env.NEXT_PUBLIC_CANDIDATES_STAGE_NEW;

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    console.log("Received body:", body);

    const { name, phone, profession, documents, manager, vacancy } = body;

    // Логируем полученные параметры
    console.log('Extracted parameters - name:', name, 'phone:', phone, 'profession:', profession, 'documents:', documents, 'manager:', manager, 'vacancy:', vacancy);

    await connectDB();

    // Проверяем, существует ли кандидат с таким номером телефона
    const existingCandidate = await Candidate.findOne({ phone: body.phone });
    if (existingCandidate) {
      console.log('Candidate with this phone already exists:', existingCandidate);
      return new NextResponse(
        JSON.stringify({
          message: "Кандидат с таким номером телефона уже существует",
        }),
        {
          status: 400,
        }
      );
    }

    // Преобразуем данные под структуру, соответствующую схеме MongoDB
    const newCandidateData = {
      source: 'сайт',
      name: name,
      phone: phone,
      manager: manager || null,  // Если manager отсутствует, устанавливаем null
      vacancy: vacancy || null,  // Если vacancy отсутствует, устанавливаем null
      professions: [] as Profession[],
      documents: documents ? documents.map((doc: any) => ({
        docType: doc.name,
        dateOfIssue: "",
        dateExp: "",
        numberDoc: "",
      })) : [], // Если documents нет, передаем пустой массив
    };

    // Логируем структуру данных кандидата
    console.log("New candidate data:", newCandidateData);

    // Проверка профессии и корректное заполнение
    if (typeof profession === 'string') {
      // Если профессия передана как строка (из формы, где это строка)
      const professionsArray = profession.split(',').map((p) => p.trim());
      professionsArray.forEach((professionName) => {
        newCandidateData.professions.push({
          name: professionName,
          experience: "", // по умолчанию пустой опыт
        });
      });
    } else if (profession && profession.name) {
      // Если профессия передана как объект (в других формах)
      newCandidateData.professions.push({
        name: profession.name,
        experience: profession.expirience || "", // если опыт не передан, используем пустую строку
      });
    }

    // Логируем, что мы создаем нового кандидата
    console.log("Saving new candidate:", newCandidateData);

    const newCandidate = new Candidate(newCandidateData);
    await newCandidate.save();

    const stageNewId = STAGE_NEW;
    if (stageNewId) {
      await Stage.findByIdAndUpdate(
        stageNewId,
        { $push: { candidates: { $each: [newCandidate._id], $position: 0 } } },
        { new: true }
      );
    }

    const eventLog = new EventLog({
      eventType: 'Добавлен кандидат',
      relatedId: newCandidate._id,
      description: `Добавлен новый кандидат с сайта Etalones.com: ${name}`,
    });

    await eventLog.save();

    return new NextResponse(
      JSON.stringify({ message: "Candidate is created", candidate: newCandidate }),
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error:', error);
    return new NextResponse(
      JSON.stringify({
        message: "Error in creating user",
        error: error.message || 'Unknown error',
      }),
      {
        status: 500,
      }
    );
  }
};
