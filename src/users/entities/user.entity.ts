import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity({ name: 'users' })
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    userId: number;

    @Column({ unique: true })
    username: string;

    @Column()
    @Exclude() // Password cannot be displayed when returning data
    password: string;

    @Column({ default: 'user' })
    role: string;

    @Column({ type: 'text', array: true, nullable: true }) // Use array type for PostgreSQL
    favoriteCats: string[];
}
