import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column("enum", { enum: ["user", "admin"], default: "user" })
    role: string;

    @Column("datetime", { default: () => "CURRENT_TIMESTAMP" })
    created_at: string;

    @Column("datetime", { default: () => "CURRENT_TIMESTAMP" })
    updated_at: string;
}

export default User;
