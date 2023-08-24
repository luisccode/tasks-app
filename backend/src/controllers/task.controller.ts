import { NextFunction, Request, Response } from "express";

export default class TaskController {
  constructor() {}

  public getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.query);

      return res.json({
        tasks: [
          {
            id: 1,
            name: "Task 1",
            done: false,
            label: "Work",
          },
        ],
      });
    } catch (err) {
      next(err);
    }
  };
}
