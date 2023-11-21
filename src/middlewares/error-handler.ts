import { NextFunction, Request, Response } from "express";
import { CustomError } from "../modules/errors/custom-error";

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // Handled errors
  if(err instanceof CustomError) {
    const { statusCode, logging } = err;
    if(logging) {
      console.error(JSON.stringify({
        code: err.statusCode,
        errors: err.errors,
        stack: err.stack,
      }, null, 2));
    }

    return res.status(statusCode).render('error', { 
        pageTitle: 'Error occured'
     });
  }

  // Unhandled errors
  console.error(JSON.stringify(err, null, 2));
  return res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};