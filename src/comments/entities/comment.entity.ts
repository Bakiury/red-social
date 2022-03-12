import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { MyPost } from "src/posts/entities/post.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    com_id: number;

    @ManyToOne(type => User, user => user.use_id)
    com_use_id: User;

    @ManyToOne(type => MyPost, myPost => myPost.pos_id)
    com_pos_id: MyPost;

    @Column({type: "varchar", length: 256})
    com_description: string;

    @CreateDateColumn({type: "timestamp", name: "created_at", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;

    @UpdateDateColumn({type: "timestamp", name: "updated_at", default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date;
}