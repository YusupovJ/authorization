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

interface VerifyPayload extends IUserPayload {
    iat: number;
    exp: number;
}

interface IRegisterDTO {
    name: string;
    email: string;
    password: string;
}

interface ILoginDTO {
    email: string;
    password: string;
}
