import AppError from "../utils/error.utils";
import bucket from "../utils/firebase.utils";


export const fileUpload = async (req: any) => {
    const file = req.file;
    const { branch, year } = req.body;
    if (!file) {
        throw new AppError("No file uploaded", 400);
    }
    
    return new Promise((resolve, reject)=> {
        try{

            const blob = bucket.file(`papers/${branch}/${year}/${Date.now()}-${file.originalname}`);
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype
                }
            })
    
            blobStream.on("error", (err) => {
                console.error("Upload error:", err);
                reject(new AppError("Upload error: " + err.message, 500));
            })
    
            blobStream.on("finish", async () => {
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    
                resolve(publicUrl);
            })
    
            blobStream.end(file.buffer);
        }catch(err: any){
            console.log("error in file upload" + err);
            reject(new AppError("Upload error: " + err.message, 500));
        }
    })
}


