import multer from "multer";


const storage = multer.memoryStorage(); //  store files in memory buffer

const upload = multer({ 
    storage,
    limits: {
        fileSize: 10*1024*1024,  // 10 MB
    },
    fileFilter(req: any, file: any, cb: any){
        if (!file.mimetype.startsWith("image/") && file.mimetype !== "application/pdf") {
            return cb(new Error("Only images or PDFs are allowed"));
          }
        cb(null, true);
    }
 });


export default upload;



