import { Schema, model, models } from "mongoose";
import  Manager  from './Manager';
import  Candidate  from './Candidate';
const VacanciesSchema = new Schema({
   
    imageFB: {
      type: String
    },
    homeImageFB: [{
      type: String
    }],
    workImageFB: [{
      type: String
    }],
      title: {
        type: String
      },
      place: {
        type: Number
      },
      experience: {
        type: String
      },
      skills: {
        type: String
      },
      roof_type: {
        type: String
      },
      location: {
        type: String
      },
      auto: {
        type: String
      },
      positions_available: {
        type: String
      },
      salary: {
        type: String
      },
      homePrice: {
        type: String
      },
      home_descr: {
        type: String
      },
      work_descr: {
        type: String
      },
      grafik: {
        type: String
      },
      drivePermis:[{
        type: String,
      }],
      documents: [{
        type: String
      }],
      langues:[{
        type: String,
      }],
      workHours: {
        type: String
      },
      getStart: {
        type: Date
      },
      published: {
        type: Boolean,
      },
      urgently: {
        type: Boolean,
      },
      last: {
        type: Boolean,
      },
      manager: {
        type: Schema.Types.ObjectId,
        ref: 'Manager'
      },
      category: {
        type: String
      },
      likes:[{
        type: String,
      }],
      dislikes:[{
        type: String,

      }],
      interestedCandidates:[{
        type: Schema.Types.ObjectId,
        ref: 'Candidate',
      }],
      slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
      

},{ timestamps: true });

const Vacancies = models?.Vacancies || model("Vacancies", VacanciesSchema);
export default Vacancies;