import { Schema, model, models } from "mongoose";
import {Vacancies} from './Vacancies';
import {News} from './News';
import {Candidate} from './Candidate';

const StageSchema = new Schema({
  name: String,
  vacancy:[{
    type: Schema.Types.ObjectId,
    ref: 'Vacancies', 
  }],
  news:[{
    type: Schema.Types.ObjectId,
    ref: 'News', 
  }],
  candidates:[{
    type: Schema.Types.ObjectId,
    ref: 'Candidate', 
  }],
  
}, { timestamps: true });

const Stage = models?.Stage || model("Stage", StageSchema);
export default Stage;
