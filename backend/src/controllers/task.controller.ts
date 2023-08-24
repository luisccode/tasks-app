import { NextFunction, Request, Response } from "express";
import { TastkService } from "../services/task.service.js";

export default class TaskController {
  private task = new TastkService();

  public getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.query);
      const tasks = await this.task.getTasks();

      return res.json({ tasks });
    } catch (err) {
      next(err);
    }
  };

  public createTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.task.createTask(req.body);

      return res.json({ success: true });
    } catch (err) {
      next(err);
    }
  };
}
