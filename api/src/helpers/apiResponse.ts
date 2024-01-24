import { HTTPError } from "./error";
import Pagination from "./pagination";
import { Response } from "express";

function apiResponse<T>(res: Response, data: T, status: number, pagination?: Pagination): void;
function apiResponse(res: Response, error: HTTPError): void;
function apiResponse(res: Response, response: any, status?: number, pagination?: Pagination) {
    if (response instanceof HTTPError) {
        res.status(response.status || 500).json({
            data: null,
            error: response.message,
            pagination: null,
            date: new Date(),
        });
    } else {
        res.status(status || 200).json({
            data: response,
            error: null,
            pagination: pagination || null,
            date: new Date(),
        });
    }
}

export default apiResponse;
