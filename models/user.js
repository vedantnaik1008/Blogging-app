import mongoose, { model, Schema } from "mongoose";
import { createHmac, randomBytes } from 'node:crypto';

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

    const salt = randomBytes(16).toString() //salt is like every user will have random 16 digit secret key
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex')

    //updating user object
    this.salt = salt;
    this.password = hashedPassword

    next()
})

export const User = model('user', userSchema)