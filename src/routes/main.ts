import express from 'express';
import { createBook, getMainPage, getSingleBookPage } from '../controllers/main-controller';
import prisma from '../libs/prisma';

const router = express.Router();

router.get('/book/:bookID', getSingleBookPage)

router.get('/', getMainPage);

router.post('/library', async (req, res, next) => {
    console.log(req.body.bookId);

    try {
        const example = await prisma.book.create({data: {
            title: 'Example 2',
            author: 'Example 2',
            description: 'Lorem ipsum'
        }});

        console.log(example)
    } catch(error) {
        next(error)
    }

    res.redirect('/')
});

router.post('/book-create', createBook)

router.post('/book', createBook)

export default router;