import { ZodIssue } from "zod";

export const composeZodValidationErrors = (issues: ZodIssue[]) => {
    let zodErrors = {};
    issues.forEach((issue: ZodIssue) => {
      zodErrors = {...zodErrors, [issue.path[0]]: issue.message}
    });
  
    return zodErrors;
  }