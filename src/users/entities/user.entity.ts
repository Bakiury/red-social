import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MyPost } from "src/posts/entities/post.entity";
import { Comment } from "src/comments/entities/comment.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    use_id: number;

    @Column({type: "varchar", length: 30})
    use_name: string;

    @Column({type: "varchar", length: 30})
    use_last_name: string;

    @Column({type: "varchar", length: 60})
    use_email: string;

    @Column({type: "varchar", length: 64})
    use_password: string;

    @Column({type: "varchar", length: 64})
    use_profile_image: string;

    @Column({type: "date"})
    use_birthday: Date;

    @Column({type: "varchar", length: 256})
    use_description: string;

    @CreateDateColumn({type: "timestamp", name: "created_at", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;

    @UpdateDateColumn({type: "timestamp", name: "updated_at", default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date;

    @OneToMany(type => MyPost, myPost => myPost.pos_use_id)
    myPost: MyPost[];

    @OneToMany(type => Comment, comment => comment.com_use_id)
    comment: Comment[];
}