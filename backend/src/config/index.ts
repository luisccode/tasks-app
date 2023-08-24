import { config } from "dotenv";
config({ path: ".env" });

export const { NODE_ENV, PORT, ORIGINS, APPSCRIPT_URL } = process.env;
