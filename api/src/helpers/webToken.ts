import env from "../config/env.config";
import { sign, verify } from "jsonwebtoken";
import { IUserPayload } from "../types";

const accessSecret = env.ACCESS_TOKEN_SECRET;
const refreshSecret = env.REFRESH_TOKEN_SECRET;

class WebToken {
    static generateAccess(payload: IUserPayload): string {
        const accessToken = sign(payload, accessSecret, { expiresIn: "30m" });
        return accessToken;
    }

    static generateRefresh(payload: IUserPayload): string {
        const refreshToken = sign(payload, refreshSecret, { expiresIn: "30d" });
        return refreshToken;
    }

    static verifyAccess(accessToken: string): IUserPayload {
        const payload = verify(accessToken, accessSecret) as IUserPayload;
        return payload;
    }

    static verifyRefresh(refreshToken: string): IUserPayload {
        const payload = verify(refreshToken, refreshSecret) as IUserPayload;
        return payload;
    }
}

export default WebToken;
