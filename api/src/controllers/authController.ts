import { Request, Response } from "express";
import { BadRequest, NotFound, Unauthorized } from "../helpers/error";
import { ILoginDTO, IRegisterDTO, IUserPayload, roleType } from "../types";
import Hasher from "../helpers/hasher";
import WebToken from "../helpers/webToken";
import apiResponse from "../helpers/apiResponse";
import authService from "../services/authService";
import getIP from "../helpers/getIP";
import handleError from "../helpers/handleError";
import tokenService from "../services/tokenService";
import User from "../entities/User.entity";
import Token from "../entities/Token.entity";

class AuthController {
    async register(req: Request<{}, {}, IRegisterDTO>, res: Response) {
        try {
            const { body } = req;

            const user = await authService.getUser(body.email);

            if (user) {
                throw new BadRequest("User already exists");
            }

            const newUser = await authService.saveUser(body);

            const payload: IUserPayload = {
                id: newUser.id,
                role: newUser.role as roleType,
            };

            const accessToken = WebToken.generateAccess(payload);
            const refreshToken = WebToken.generateRefresh(payload);

            res.cookie("refreshToken", refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            const hashedRefreshToken = Hasher.hash(refreshToken);

            const ip = getIP(req);

            await tokenService.saveToken(newUser, hashedRefreshToken, ip);

            apiResponse(res, { accessToken, refreshToken }, 201);
        } catch (error) {
            handleError(res, error);
        }
    }

    async login(req: Request<{}, {}, ILoginDTO>, res: Response) {
        try {
            const { body } = req;

            const user = (await authService.getUser(body.email)) as User;

            if (!user) {
                throw new BadRequest("Password or email is incorrect");
            }

            const isPasswordRight = Hasher.compare(body.password, user.password);

            if (!isPasswordRight) {
                throw new BadRequest("Password or email is incorrect");
            }

            const payload: IUserPayload = {
                id: user.id,
                role: user.role as roleType,
            };

            const accessToken = WebToken.generateAccess(payload);
            const refreshToken = WebToken.generateRefresh(payload);

            res.cookie("refreshToken", refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            const ip = getIP(req);
            const hashedRefreshToken = Hasher.hash(refreshToken);

            const savedToken = (await tokenService.getToken(user, ip)) as Token;

            if (!savedToken) {
                await tokenService.saveToken(user, hashedRefreshToken, ip);
            } else {
                await tokenService.updateToken(savedToken.id, hashedRefreshToken);
            }

            apiResponse(res, { accessToken, refreshToken }, 200);
        } catch (error) {
            handleError(res, error);
        }
    }

    async refresh(req: Request, res: Response) {
        try {
            const { refreshToken } = req.cookies;

            if (!refreshToken) {
                throw new Unauthorized("You must be authorized");
            }

            const ip = getIP(req);

            const payload = WebToken.verifyRefresh(refreshToken);
            const user = (await authService.getUserById(payload.id)) as User;

            if (!user) {
                throw new NotFound("User not found");
            }

            const token = (await tokenService.getToken(user, ip)) as Token;

            if (!token) {
                throw new Unauthorized("You must be authorized");
            }

            const isTokenRight = Hasher.compare(refreshToken, token.refresh_token);

            if (!isTokenRight) {
                throw new BadRequest("Token is incorrect");
            }

            const newAccessToken = WebToken.generateAccess({
                id: payload.id,
                role: payload.role,
            });
            const newRefreshToken = WebToken.generateRefresh({
                id: payload.id,
                role: payload.role,
            });

            res.cookie("refreshToken", newRefreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            const hashedRefreshToken = Hasher.hash(newRefreshToken);

            await tokenService.updateToken(token.id, hashedRefreshToken);

            const tokens = {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            };

            apiResponse(res, tokens, 200);
        } catch (error) {
            handleError(res, error);
        }
    }

    async logout(req: Request, res: Response) {
        try {
            const { id } = req;

            const user = (await authService.getUserById(id)) as User;

            if (!user) {
                throw new NotFound("User not found");
            }

            const ip = getIP(req);
            const token = (await tokenService.getToken(user, ip)) as Token;

            if (!token) {
                throw new Unauthorized("You must be authorized");
            }

            await tokenService.deleteToken(token.id);

            apiResponse(res, "You successfully logged out", 200);
        } catch (error) {
            handleError(res, error);
        }
    }

    async me(req: Request, res: Response) {
        try {
            const { id } = req;

            const user = (await authService.getUserById(id)) as User;

            if (!user) {
                throw new NotFound("User not found");
            }

            const { password, ...response } = user;

            apiResponse(res, response, 200);
        } catch (error) {
            handleError(res, error);
        }
    }
}

export default new AuthController();
