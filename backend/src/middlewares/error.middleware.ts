import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/httpException";

export const ErrorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || "Something went wrong";

    console.log(
      `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`
    );
    return res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};
