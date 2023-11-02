import { Request, Response } from "express"

const MockedBooks = [
    {
        title: 'Aaa',
        author: 'Bbb',
        description: 'Ccc',
        stars: 4,
        image: 'https://s.lubimyczytac.pl/upload/texts/19900/19947/19947_1698672083_grafika400x300.jpg',
        id: '1',
    },
    {
        title: 'Aaa2',
        author: 'Bbb2',
        description: 'Ccc2',
        stars: 4,
        image: 'https://s.lubimyczytac.pl/upload/texts/19900/19947/19947_1698672083_grafika400x300.jpg',
        id: '2',
    },
    {
        title: 'Aaa2',
        author: 'Bbb2',
        description: 'Ccc2',
        stars: 4,
        image: 'https://s.lubimyczytac.pl/upload/texts/19900/19947/19947_1698672083_grafika400x300.jpg',
        id: '3',
    },
    {
        title: 'Aaa3',
        author: 'Bbb3',
        description: 'Ccc3',
        stars: 4,
        image: 'https://s.lubimyczytac.pl/upload/texts/19900/19947/19947_1698672083_grafika400x300.jpg',
        id: '4',
    },
    {
        title: 'Aaa4',
        author: 'Bbb4',
        description: 'Ccc4',
        stars: 4,
        image: 'https://s.lubimyczytac.pl/upload/texts/19900/19947/19947_1698672083_grafika400x300.jpg',
        id: '5',
    }
]

type Book = {
    title: string,
    author: string,
    description: string,
    stars: number,
    image: string,
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

export const getSingleBookPage = (req: Request<{bookID: string | null}>, res: Response) => {
    const { bookID } = req.params;

    console.log(bookID);

    if(!bookID) {
        return 
    }

    const pageProps: BookPageProps = {
        pageTitle: 'Book title',
        book: MockedBooks[0],
    }

    res.render('book', pageProps)
}