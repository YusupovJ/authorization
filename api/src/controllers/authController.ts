import { Request, Response } from "express";
import { BadRequest, HTTPError } from "../helpers/error";
import { IRegisterDTO, IUserPayload, roleType } from "../types";
import Hasher from "../helpers/hasher";
import WebToken from "../helpers/webToken";
import apiResponse from "../helpers/apiResponse";
import authService from "../services/authService";

class AuthController {
    async register(req: Request<{}, {}, IRegisterDTO>, res: Response) {
        try {
            const { body } = req;

            const isUserExist = await authService.getUser(body.email);

            if (isUserExist) {
                throw new BadRequest("User already exists");
            }

            const newUser = await authService.saveUser(body);

            const payload: IUserPayload = {
                id: newUser.id,
                role: newUser.role as roleType,
            };

            const accessToken = WebToken.generateAccess(payload);
            const refreshToken = WebToken.generateRefresh(payload);

            const hashedRefreshToken = Hasher.hash(refreshToken);

            const ip = req.ip || (req.socket.remoteAddress as string);

            await authService.saveToken(hashedRefreshToken, newUser, ip);

            apiResponse(res, { accessToken, refreshToken }, 201);
        } catch (error) {
            console.log(error);
            if (error instanceof HTTPError) {
                apiResponse(res, error);
            } else {
                apiResponse(res, new HTTPError("Internal Server Error", 500));
            }
        }
    }

    async login(req: Request, res: Response) {}
    async refresh(req: Request, res: Response) {}
    async logout(req: Request, res: Response) {}
    async me(req: Request, res: Response) {}
}

export default new AuthController();
