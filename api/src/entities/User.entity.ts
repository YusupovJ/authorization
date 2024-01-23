import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Token from "./Token.entity";

@Entity()
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 255 })
    name: string;

    @Column("varchar", { unique: true, length: 255 })
    email: string;

    @Column("varchar", { length: 255 })
    password: string;

    @Column("enum", { enum: ["user", "admin"] })
    role: string;

    @OneToMany(() => Token, (token) => token.user, { nullable: true })
    tokens: Token[];

    @Column("datetime", { default: () => "CURRENT_TIMESTAMP" })
    created_at: string;

    @Column("datetime", { default: () => "CURRENT_TIMESTAMP" })
    updated_at: string;
}

export default User;
