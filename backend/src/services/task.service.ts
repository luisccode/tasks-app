import axios from "axios";
import { Task } from "../interfaces/task.interface";

export class TastkService {
  private taskApi = axios.create({
    baseURL:
      "https://script.google.com/macros/s/AKfycbxzvqlXZN7fFLMgavnlKyz95kig6yaWQeMesL-EIT8QZ7j-azPeT8tXP_RXeFDFkRUdrA/exec",
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
    const response = await this.taskApi.post("", task);

    return response;
  }
}
