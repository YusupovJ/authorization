import { ObjectLiteral, Repository } from "typeorm";
import db from "../config/db.config";
import User from "../entities/User.entity";
import Hasher from "../helpers/hasher";
import { IRegisterDTO } from "../types";

class AuthService {
    private userRepo: Repository<ObjectLiteral>;

    constructor() {
        this.userRepo = db.getRepository(User);
    }

    async getUser(email: string) {
        const user = await this.userRepo.findOne({ where: { email } });

        return user;
    }

    async saveUser(userInfo: IRegisterDTO) {
        const newUser = new User();
        newUser.email = userInfo.email;
        newUser.name = userInfo.name;
        newUser.password = Hasher.hash(userInfo.password);

        await this.userRepo.save(newUser);

        return newUser;
    }
}

export default new AuthService();
