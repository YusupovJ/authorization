import env from "../config/env.config";
import { sign, verify } from "jsonwebtoken";
import { IUserPayload, VerifyPayload } from "../types";

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

    static verifyAccess(accessToken: string): VerifyPayload {
        const payload = verify(accessToken, accessSecret) as VerifyPayload;
        return payload;
    }

    static verifyRefresh(refreshToken: string): VerifyPayload {
        const payload = verify(refreshToken, refreshSecret) as VerifyPayload;
        return payload;
    }
}

export default WebToken;
