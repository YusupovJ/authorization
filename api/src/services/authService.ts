import db from "../config/db.config";
import Token from "../entities/Token.entity";
import User from "../entities/User.entity";
import Hasher from "../helpers/hasher";
import { IRegisterDTO } from "../types";

class AuthService {
    async getUser(email: string) {
        const userRepo = db.getRepository(User);
        const user = await userRepo.findOne({ where: { email } });

        return user;
    }

    async saveUser(userInfo: IRegisterDTO) {
        const userRepo = db.getRepository(User);

        const newUser = new User();
        newUser.email = userInfo.email;
        newUser.name = userInfo.name;
        newUser.password = Hasher.hash(userInfo.password);

        await userRepo.save(newUser);

        return newUser;
    }

    async saveToken(refreshToken: string, newUser: User, ip: string) {
        const tokenRepo = db.getRepository(Token);

        const newToken = new Token();
        newToken.user = newUser;
        newToken.ip_address = ip;
        newToken.refresh_token = refreshToken;

        await tokenRepo.save(newToken);

        return newToken;
    }
}

export default new AuthService();
