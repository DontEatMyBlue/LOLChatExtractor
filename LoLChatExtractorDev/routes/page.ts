import express from 'express';
import { renderMain, renderUpload } from '../controllers/page';

const router = express.Router();

router.get('/', renderMain);
router.get('/upload',renderUpload);

export default router;
