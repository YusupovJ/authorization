import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 255 })
    ip_address: string;

    @ManyToOne(() => User, (user) => user.tokens)
    user: User;

    @Column("datetime", { default: () => "CURRENT_TIMESTAMP" })
    created_at: string;

    @Column("datetime", { default: () => "CURRENT_TIMESTAMP" })
    updated_at: string;
}
