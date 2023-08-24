import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const ValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = errors.array()[0].msg;
    console.log(errors);
    return res.status(400).json({ error });
  }

  return next();
};
