import { Router } from "express";
import TaskController from "../controllers/task.controller.js";
import { body } from "express-validator";
import { ValidationMiddleware } from "../middlewares/validation.middleware.js";

export default class TaskRoute {
  public path = "/tasks";
  public router = Router();
  public task: TaskController;

  constructor() {
    this.task = new TaskController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.task.getTasks);

    this.router.post(
      this.path,
      [
        body("name").notEmpty().withMessage("name is required"),
        body("description").notEmpty().withMessage("description is required"),
        body("type").notEmpty().withMessage("type is required"),
        body("label").notEmpty().withMessage("label is required"),
        body("dueDate").notEmpty().withMessage("dueDate is required"),
      ],
      ValidationMiddleware,
      this.task.createTask
    );
  }
}
