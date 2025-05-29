import { Schema, model, models } from "mongoose";

const ReviewsSchema = new Schema({
    name:{
      type: String
    },
    rating:{
      type: Number
    },
    comment:{
      type: String
    },
    image: {
      type: String, 
    },
    userId: {
      type: String, 
    },
    email:{
      type: String
    },
    likes: [{
      type: String
    }],  
    dislikes: [{
      type: String
    }], 
  
  },{ timestamps: true });

const Reviews = models?.Reviews || model("Reviews", ReviewsSchema);
export default Reviews;