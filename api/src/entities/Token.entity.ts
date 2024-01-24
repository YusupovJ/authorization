import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./User.entity";
@Entity()
class Token {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 255 })
    ip_address: string;

    @Column("text")
    refresh_token: string;

    @ManyToMany(() => User)
    @JoinTable()
    users: User[];

    @Column("datetime", { default: () => "CURRENT_TIMESTAMP" })
    created_at: string;

    @Column("datetime", { default: () => "CURRENT_TIMESTAMP" })
    updated_at: string;
}

export default Token;
