import { Schema, model, models } from "mongoose";
import { Candidate } from "./Candidate"
const EventLogSchema = new Schema({
    eventType: {
        type: String,
      },
      relatedId:{
        type: Schema.Types.ObjectId,
        ref: 'Candidate',
      },
    
    description: {
        type: String,
        required: true,
      },
      
      comment:{
        type: String,
      },
}, { timestamps: true });

const EventLog = models?.EventLog || model("EventLog", EventLogSchema)
export default EventLog;