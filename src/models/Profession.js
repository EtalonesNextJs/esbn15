import { Schema, model, models } from "mongoose";


const ProfessionSchema = new Schema({
  name: String,
 description: String,
 category: String,
}, { timestamps: true });

const Profession = models?.Profession || model("Profession", ProfessionSchema);
export default Profession;
