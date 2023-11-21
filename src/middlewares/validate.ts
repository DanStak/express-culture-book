import { AnyZodObject } from "zod";
import { composeZodValidationErrors } from "../utils/compose-zod-errors";
import ValidationError from "../modules/errors/validation-error";

export const validate = (schema: AnyZodObject, object: Object) => {
      const data = schema.safeParse(object);

      if(data.success) {
        return data.data;
      }

      throw new ValidationError({ context: composeZodValidationErrors(data.error.issues) })
};