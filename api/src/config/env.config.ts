import dotenv from "dotenv";
import { cleanEnv, num, str } from "envalid";

dotenv.config();

const env = cleanEnv(process.env, {
    PORT: num(),
    DB_NAME: str(),
    DB_USER: str(),
    DB_PASSWORD: str(),
    DB_HOST: str(),
    DB_PORT: num(),
    ACCESS_TOKEN_SECRET: str(),
    REFRESH_TOKEN_SECRET: str(),
});

export default env;
