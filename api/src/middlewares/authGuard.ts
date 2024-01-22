import { NextFunction, Response, Request } from "express";
import { HTTPError, Unauthorized } from "../helpers/error";
import apiResponse from "../helpers/apiResponse";
import WebToken from "../helpers/webToken";

const authGuard = (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization?.split(" ")[1];

        if (!accessToken) {
            throw new Unauthorized("You must be authorized");
        }

        const payload = WebToken.verifyAccess(accessToken);

        req.id = payload.id;
        req.role = payload.role;

        next();
    } catch (error) {
        if (error instanceof HTTPError) apiResponse(res, error);
    }
};

export default authGuard;
