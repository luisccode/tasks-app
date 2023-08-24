import App from "./app.js";
import { NODE_ENV } from "./config/index.js";
import TaskRoute from "./routes/task.route.js";

const app = new App([new TaskRoute()]);

if (NODE_ENV !== "production") {
  app.listen();
}
