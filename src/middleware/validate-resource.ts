import type { Request, Response, NextFunction } from "express";
import type { ObjectSchema } from "valibot";
import * as v from "valibot";

const validateResource = (schema: ObjectSchema<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    v.parse(schema, { body: req.body, params: req.params, query: req.query });
    next();
  };
};

export default validateResource;
