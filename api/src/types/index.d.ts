import { Request } from "express";

declare global {
    namespace Express {
        export interface Request extends IUserPayload {}
    }
}

type roleType = "user" | "admin";

interface IUserPayload {
    id: number;
    role: roleType;
}