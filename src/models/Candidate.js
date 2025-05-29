import { Schema, model, models } from "mongoose";

const CandidateSchema = new Schema(
    {
        source:{
        type: String
        },
        avatar:{
        name: String,
        data: Buffer,
        contentType: String
      },
        name: {
        type: String,
        },
        phone:{
        type: String,
        },
        email:{
            type: String,
            },
        time:{
        type: String,  
        },
        age:{
          type: Date,
        },
        langue:{
          name: String,
          level: String,
         },
        currentPage:{
        type: String,
        },
        locations: {
        type: String,
          
        },
        professions: [{
          name:  String,
          experience: String,
        }],
        drivePermis: [{
        type: String,
      }],
        documents: [{ 
          docType: String,
          dateOfIssue: String,
          dateExp: String,
          numberDoc: String
        }],
        langue:{
        name: String,
        level: String,
         },
         comment: [{
          text: {
        type: String
          },
          date: {
        type: Date,
        default: Date.now
          }
        }],
      },
      { timestamps: true }
)

const Candidate = models?.Candidate || model("Candidate", CandidateSchema);
export default Candidate;