import { Router } from "express";
import TaskController from "../controllers/task.controller.js";

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
  }
}
