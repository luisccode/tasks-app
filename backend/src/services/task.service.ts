import axios from "axios";
import { Task } from "../interfaces/task.interface";
import { APPSCRIPT_URL } from "../config/index.js";

export class TastkService {
  private taskApi = axios.create({
    baseURL: APPSCRIPT_URL!,
    headers: {
      "Content-Type": "application/json",
    },
  });

  private normalizeTasks(tasks: string[]) {
    // delete header
    tasks.shift();

    const normalizedTasks = tasks.map((task) => {
      const [name, description, type, label, dueDate] = task;

      return {
        name,
        description,
        type,
        label,
        dueDate,
      };
    });

    return normalizedTasks;
  }

  public async getTasks() {
    const response: { data: { data: string[] } } = await this.taskApi.get("");

    const tasks = this.normalizeTasks(response.data.data);

    return tasks;
  }

  public async createTask(task: Task) {
    const { name, dueDate, type } = task;

    let label = "";

    // Label Logic
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    const daysUntilDue = Math.floor(
      (taskDueDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (type === "Work") {
      if (daysUntilDue === 1) {
        label = "Urgent";
      } else if (name.includes("PLO") || name.includes("GJL")) {
        if (daysUntilDue <= 30) {
          label = "Can be postponed";
        }
      }
    } else if (type === "Health") {
      if (daysUntilDue <= 3 && !name.includes("Treatment")) {
        label = "Urgent";
      }
    } else if (type === "Personal") {
      if (daysUntilDue <= 7) {
        label = "Can be postponed";
      }
    } else if (type === "Other") {
      if (daysUntilDue <= 5) {
        label = "Can be postponed";
      }
    }

    if (daysUntilDue > 7) {
      label = "Not important";
    }

    // Set the label in the task object
    task.label = label;

    const response = await this.taskApi.post("", task);

    return response;
  }
}
