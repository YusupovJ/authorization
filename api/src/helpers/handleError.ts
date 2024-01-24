import { Response } from "express";
import apiResponse from "./apiResponse";
import { HTTPError } from "./error";

const handleError = (res: Response, error: any) => {
    console.log(error);
    if (error instanceof HTTPError) {
        apiResponse(res, error);
    } else {
        const internalError = new HTTPError("Internal server error", 500);
        apiResponse(res, internalError);
    }
};

export default handleError;
