import express,{Request,Response} from 'express';
import multer,{FileFilterCallback} from 'multer';
import { uploadLog } from '../controllers/post';

const memoryStorage = multer.memoryStorage();
const upload = multer({storage:memoryStorage});

const router = express.Router();

router.post('/upload',upload.single('file'),uploadLog);

export default router;


