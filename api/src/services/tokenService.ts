import { ObjectLiteral, Repository } from "typeorm";
import db from "../config/db.config";
import Token from "../entities/Token.entity";
import User from "../entities/User.entity";

class TokenService {
    private tokenRepo: Repository<ObjectLiteral>;

    constructor() {
        this.tokenRepo = db.getRepository(Token);
    }

    async saveToken(user: User, refreshToken: string, ip: string) {
        const newToken = new Token();
        newToken.ip_address = ip;
        newToken.refresh_token = refreshToken;
        newToken.users = [user];

        await this.tokenRepo.save(newToken);

        return newToken;
    }

    async getToken(user: User, ip: string) {
        const token = await this.tokenRepo
            .createQueryBuilder("token")
            .leftJoinAndSelect("token.users", "user")
            .where("token.ip_address = :ip", { ip })
            .andWhere("token_user.userId = :userId", { userId: user.id })
            .getOne();

        return token;
    }

    async updateToken(id: number, refreshToken: string) {
        const updatedToken = {
            refresh_token: refreshToken,
            updated_at: new Date(),
        };

        await this.tokenRepo.update({ id }, updatedToken);
    }

    async deleteToken(id: number) {
        await this.tokenRepo.delete({ id });
    }
}

export default new TokenService();
