import mongoose from "mongoose";
import validator from "validator";
import type { UserSchemaTypes } from "../types/user.types.js";

const userSchema = new mongoose.Schema<UserSchemaTypes>({
    firstName: {
        type: String,
        trim: true,
        required: true,
        minLength: [3, "firstname atleast having 3 characters"],
        maxLength: [20, "firstname atmost having 20 characters"]
    },
    lastName: {
        type: String,
        trim: true,
        minLength: [3, "firstname atleast having 3 characters"],
        maxLength: [20, "firstname atmost having 20 characters"]
    },
    email: {
        type: String,
        trim: true,
        validate(val: string){
            if(!validator.isEmail(val)) throw new Error("Enter a valid email address");
        },
        required: true
    },
    password: {
        type: String,
        trim: true,
        validate(val: string){
            if(!validator.isStrongPassword(val)) throw new Error("Password must be at least 8 characters long and include at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.");
        },
        select: false,
        required: true
    },
    role: {
        type: String,
    },
}, {
    timestamps: true,
})

const User = mongoose.model<UserSchemaTypes>("User", userSchema);

export default User;

