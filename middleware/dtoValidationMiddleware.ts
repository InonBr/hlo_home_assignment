import { RequestHandler } from "express";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";

function dtoValidationMiddleware(
  type: any,
  skipMissingProperties = false
): RequestHandler {
  return (req, res, next) => {
    const dtoObj = plainToClass(type, req.body);
    validate(dtoObj, { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const dtoErrors = errors.map((err) => {
            return {
              property: err.property,
              msg: Object.values(err.constraints)[0],
            };
          });

          return res.status(400).json({ status: 400, message: dtoErrors });
        } else {
          next();
        }
      }
    );
  };
}

export default dtoValidationMiddleware;
