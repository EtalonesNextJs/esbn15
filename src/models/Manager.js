import { Schema, model, models } from "mongoose";
import Vacancies from './Vacancies';
const ManagerSchema = new Schema({
  vacancy: [{
    type: Schema.Types.ObjectId,
    ref: 'Vacancies'
  }],

      email: {
        type: String,
        unique: true,
      },
      image: {
        name: String,
        data: Buffer,
        contentType: String
      },
      name: {
        type: String,
      },
      phone: {
        type: String,
        unique: true,
      },
      telegram: {
        type: String
      },
      viber: {
        type: String
      },
      whatsapp: {
        type: String
      },
      onSite:{
        type: Boolean,
        default: false
      },
    
});


const Manager = models?.Manager || model("Manager", ManagerSchema);
export default Manager;