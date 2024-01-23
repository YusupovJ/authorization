import { DataSource } from "typeorm";
import env from "./env.config";
import User from "../entities/User.entity";
import Token from "../entities/Token.entity";

const db = new DataSource({
    type: "mysql",
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    synchronize: true,
    entities: [User, Token],
});

export default db;
