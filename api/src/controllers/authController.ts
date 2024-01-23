import { Request, Response } from "express";
import db from "../config/db.config";
import { User } from "../entities/User.entity";
import { BadRequest } from "../helpers/error";
import Hasher from "../helpers/hasher";

interface IRegisterDTO {
    name: string;
    email: string;
    password: string;
}

class AuthController {
    private static async getUser(email: string) {
        const userRepo = db.getRepository(User);
        const user = await userRepo.findOne({ where: { email } });

        return user;
    }

    private static async saveUser(userInfo: IRegisterDTO) {
        const userRepo = db.getRepository(User);

        const newUser = new User();
        newUser.email = userInfo.email;
        newUser.name = userInfo.name;
        newUser.password = Hasher.hash(userInfo.password);

        await userRepo.save(newUser);
    }

    static async register(req: Request<{}, {}, IRegisterDTO>, res: Response) {
        const { name, email, password } = req.body;

        const isUserExist = await this.getUser(email);

        if (isUserExist) {
            throw new BadRequest("User already exists");
        }
    }

    static async login(req: Request, res: Response) {}
    static async refresh(req: Request, res: Response) {}
    static async logout(req: Request, res: Response) {}
    static async me(req: Request, res: Response) {}
}

export default AuthController;
