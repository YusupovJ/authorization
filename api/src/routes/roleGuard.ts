import { NextFunction, Request, Response } from "express";
import { roleType } from "../types";
import { Forbidden, HTTPError } from "../helpers/error";
import apiResponse from "../helpers/apiResponse";

const roleGuard = (...roles: roleType[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!roles.includes(req.role)) {
                throw new Forbidden("Access denied. You do not have enough rights");
            }
            next();
        } catch (error) {
            if (error instanceof HTTPError) apiResponse(res, error);
        }
    };
};

export default roleGuard;
