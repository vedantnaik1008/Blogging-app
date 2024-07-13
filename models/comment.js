import { Schema, model } from "mongoose";


const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: 'blog',
    },//which user has commented on which blog 
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }// relation user
}, {timestamps: true});

export const Comment = model('comment', commentSchema);

