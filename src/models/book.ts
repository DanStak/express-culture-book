import { Book } from "@prisma/client"
// import { NextFunction, Request, Response } from "express"
import prisma from "../libs/prisma";

type BookCreateType = Omit<Book,  'id' | 'rate' | 'createdAt' | 'updatedAt'>

export const getAllBooks = async (): Promise<Book[]> => {
    return prisma.book.findMany()
}

export const getBookByID = async (id: string): Promise<Book | null> => {
    return prisma.book.findUnique({
        where: {
            id,
        }
    })
}

export const createBook = async (data:BookCreateType): Promise<Book | null> => {
    return prisma.book.create({
        data
    })
}