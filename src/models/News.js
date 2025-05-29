import { Schema, model, models } from "mongoose";

const NewsSchema = new Schema({
    imageFB: [{
        type: String
    }],
    image: {
        name: String,
        data: Buffer,
        contentType: String
    },
    source: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: [{
        title: String,
        content: String
    }],
});

const News = models?.News || model("News", NewsSchema);
export default News;