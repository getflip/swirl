import dotenv from "dotenv";
import { envVariables } from ".";

dotenv.config();

export const env = envVariables.parse(process.env);
