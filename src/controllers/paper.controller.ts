import Paper from "../models/Paper";
import { fileUpload } from "../services/paper.service";
import AppError from "../utils/error.utils";

export const getAllPapers = async (req: any, res: any, next: any)=> {
    try{
        const papers =  await Paper.find({});

        if(papers.length === 0){
            return res.status(200).json({
                success: true,
                message: "No papers found.",
                papers: []
            });
        }

        res.status(200).json({
            success: true,
            message: "get papers data successfully.",
            papers
        })

    }catch(err: any){
        console.log("error in get papers route controller");
        return next(new AppError("ERROR: " + err, 500));
    }
}

export const uploadPapers = async (req: any, res: any, next: any) => {
    try{
        const { title, subject, branch, year, examType } = req.body;
        if (!title || !subject || !branch || !year || !examType) {
            return next(new AppError("All fields are required", 400));
        }
        

        const fileUrl = await fileUpload(req);
        if (!fileUrl) {
            return next(new AppError("File upload failed", 500));
          }
        
        const paper = new Paper({
            title,
            subject,
            branch,
            year,
            examType,
            fileUrl
        })

        await paper.save();

        res.status(200).json({
            success: true,
            message: "paper upload successfully.",
            paper
        })

    }catch(err: any){
        console.log("error in the upload route controller")
        return next(new AppError("ERROR: " + err, 500))
    }
}

