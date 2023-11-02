import express from 'express';
import { getMainPage, getSingleBookPage } from '../controllers/main-controller';

const router = express.Router();

router.get('/', getMainPage);

router.get('/book/:bookID', getSingleBookPage)

export default router;