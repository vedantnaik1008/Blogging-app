import mongoose from "mongoose";
import { createHmac } from 'node:crypto';

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        salt: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        profileImageURL: {
            type: String,
            default: "../public/image/istockphoto-1337144146-612x612.jpg",
        },
        role: {
            type: String,
            enum: ["USER", "ADMIN"] ,
            default: "USER",
        },
    },
    { timestamps: true }
);

userSchema.pre("save", function (next) {
    const user = this;

    if(!user.isModified('password')) return;

    
})

export const User = model('user', userSchema)