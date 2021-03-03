import * as mongoose from 'mongoose'

export const BlogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: String, required: true},
    imageLink: {type: String, required: true}
});

export interface Blog extends mongoose.Document {
    id: string;
    title: string;
    content: string;
    image: string;
    author: string;
}