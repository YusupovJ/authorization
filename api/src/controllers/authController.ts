import { Request, Response } from "express";

class AuthController {
    static async register(req: Request, res: Response) {}
    static async login(req: Request, res: Response) {}
    static async refresh(req: Request, res: Response) {}
    static async logout(req: Request, res: Response) {}
    static async me(req: Request, res: Response) {}
}

export default AuthController;
