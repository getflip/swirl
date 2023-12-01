import dotenv from "dotenv";
import { envVariables } from ".";

dotenv.config();

export const Env = envVariables.parse(process.env);
