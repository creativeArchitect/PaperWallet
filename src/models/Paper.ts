import mongoose from "mongoose";
import type { PaperType } from "../types/paper.types.ts";
import validator from "validator";


const paperSchema = new mongoose.Schema<PaperType>({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true,
    },
    subject: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        validate(val: string){
            if(!validator.isURL(val)) throw new Error("Enter a valid URL");
        },
        trim: true
    },
    fileType: {
        type: String,
        validate(val: string){
            if(!validator.isURL(val)) throw new Error("Enter a valid URL");
        },
    }
})


const Paper = mongoose.model<PaperType>("Paper", paperSchema);

export default Paper;