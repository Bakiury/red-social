import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Comment } from "src/comments/entities/comment.entity";

@Entity()
export class MyPost {
    @PrimaryGeneratedColumn()
    pos_id: number;

    @ManyToOne(type => User, user => user.use_id)
    pos_use_id: User;

    @Column({type: "varchar", length: 256})
    pos_description: string;

    @CreateDateColumn({type: "timestamp", name: "created_at", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;

    @UpdateDateColumn({type: "timestamp", name: "updated_at", default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date;

    @OneToMany(type => Comment, comment => comment.com_pos_id)
    comment: Comment[];
}