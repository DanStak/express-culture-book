import { NextFunction, Request, Response } from "express"
import prisma from "../libs/prisma"
import z from "zod"
import { validate } from "../middlewares/validate"
import ValidationError from "../modules/errors/validation-error"
// import BadRequestError from "../modules/errors/bad-request-error"
// import * as BookModel from '../models/book';

const MockedBooks = [
    {
        title: 'Aaa',
        author: 'Bbb',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam iusto consequuntur, reiciendis magni odio possimus rerum, facilis ut nesciunt at, quo veniam temporibus numquam soluta porro iste. Eligendi, suscipit reiciendis.',
        stars: 4,
        image: 'https://s.lubimyczytac.pl/upload/texts/19900/19947/19947_1698672083_grafika400x300.jpg',
        id: '1',
    },
    {
        title: 'Aaa2',
        author: 'Bbb2',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam iusto consequuntur, reiciendis magni odio possimus rerum, facilis ut nesciunt at, quo veniam temporibus numquam soluta porro iste. Eligendi, suscipit reiciendis.',
        stars: 4,
        image: 'https://s.lubimyczytac.pl/upload/texts/19900/19947/19947_1698672083_grafika400x300.jpg',
        id: '2',
    },
    {
        title: 'Aaa2',
        author: 'Bbb2',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam iusto consequuntur, reiciendis magni odio possimus rerum, facilis ut nesciunt at, quo veniam temporibus numquam soluta porro iste. Eligendi, suscipit reiciendis.',
        stars: 4,
        image: 'https://s.lubimyczytac.pl/upload/texts/19900/19947/19947_1698672083_grafika400x300.jpg',
        id: '3',
    },
    {
        title: 'Aaa3',
        author: 'Bbb3',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam iusto consequuntur, reiciendis magni odio possimus rerum, facilis ut nesciunt at, quo veniam temporibus numquam soluta porro iste. Eligendi, suscipit reiciendis.',
        stars: 4,
        image: 'https://s.lubimyczytac.pl/upload/texts/19900/19947/19947_1698672083_grafika400x300.jpg',
        id: '4',
    },
    {
        title: 'Aaa4',
        author: 'Bbb4',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam iusto consequuntur, reiciendis magni odio possimus rerum, facilis ut nesciunt at, quo veniam temporibus numquam soluta porro iste. Eligendi, suscipit reiciendis.',
        stars: 4,
        image: 'https://s.lubimyczytac.pl/upload/texts/19900/19947/19947_1698672083_grafika400x300.jpg',
        id: '5',
    }
]

type Book = {
    title: string,
    author: string,
    description: string,
    // stars: number,
    // image: string,
    id: string
}

interface PageProps {
    pageTitle: string,
}

interface MainPageProps extends PageProps {
    books: Array<Book>
}

interface BookPageProps extends PageProps {
    book: Book
}

export const getMainPage = (_req: Request, res: Response) => {

    const pageProps: MainPageProps = {
        pageTitle: 'Start page',
        books: MockedBooks,
    }

    res.render('main', pageProps)
}

export const getSingleBookPage = async (req: Request<{bookID: string | null}>, res: Response, next: NextFunction) => {
    const { bookID } = req.params;

    console.log(bookID);

    try {
        const books = await prisma.book.findMany();

        console.log(books);

        // if(!book) {
        //     return next()
        // }

        const pageProps: BookPageProps = {
            pageTitle: 'Title',
            book: MockedBooks[0],
        }
    
        res.render('book', pageProps)
    } catch(error) {
        next(error)
    }

    // if(bookID) {
    //     throw new BadRequestError();
    // }
}

export const getBookCreate =async (req: Request, res: Response, next: NextFunction) => {
    res.render()
}

const BookSchema = z.object({
    title: z.string(),
    author: z.string()
})

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    try {
        const data = validate(BookSchema, req.body);
        console.log(data)
    
        res.send('WELCOME')

    } catch (error) {
        if(error instanceof ValidationError) {
            console.log(error.errors.context)
        }

        return next()
    }

    // try {
    //     const createdBook = await BookModel.createBook(req.body)
    // } catch(error) {
    //     next(error)
    // }
}



// try {
//     const result = shape.safeParse(body);
//     if(!result.success) {
//       const zodErrors = composeZodValidationErrors(result.error.issues)
//       return new ValidationError(zodErrors).throw();
//     }

//     return onSuccess(result.data);
//   } catch (error) {
//     return new GenericError(error).throw();
//   }