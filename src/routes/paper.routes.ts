import { Router } from "express"
import { getAllPapers, uploadPapers } from "../controllers/paper.controller";
import multer from "multer";

const paperRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

paperRouter.get('/', getAllPapers);
paperRouter.post('/upload', upload.single("file"), uploadPapers);

export default paperRouter;

