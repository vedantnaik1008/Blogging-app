import { model, Schema } from 'mongoose';

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        coverImageURL: {
            type: String,
            required: false
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }, //relation
    },
    { timestamps: true }
);

export const Blog = model('blog', blogSchema)
