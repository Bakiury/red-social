import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(Comment) private commentsRepository: Repository<Comment>) {

    }
  
    getAll(): Promise<Comment[]> {
      return this.commentsRepository.find({
        relations: ['com_use_id', 'com_pos_id']
      }); // SELECT * FROM comment JOIN user, JOIN my_post
    }
  
    async getOneById(id: number): Promise<Comment> {
      try {
        const commentID = await this.commentsRepository.findOneOrFail(id); // SELECT * FROM comment WHERE com_id = id;
        return commentID;
      } catch (error) {
        // handle error
        throw error;
      }
    }
  
    createComment(data: object): Promise<Comment> {
      console.log(data);
      const newcomment = this.commentsRepository.create(data); // const newcomment = new comment(); newcomment.name = name;
  
      return this.commentsRepository.save(newcomment); // INSERT
    }
  
    async updateComment(id: number, data: object): Promise<Comment> {
      try {
        const commentID = await this.commentsRepository.findOneOrFail(id);
        this.commentsRepository.merge(commentID, data);
  
        return this.commentsRepository.save(commentID); // UPDATE
      } catch (error) {
        // handle error
        throw error;
      }
    }
  
    async deleteComment(id: number): Promise<Comment> {
      try {
        const commentID = await this.commentsRepository.findOneOrFail(id);
  
        return this.commentsRepository.remove(commentID); // DELETE
      } catch (error) {
        // handle error
        throw error;
      }
    }
  
    customQueryTest(): any {
      return this.commentsRepository.createQueryBuilder("comment").select("com_description").where("com_id = :id", { id: 1}).getOne();
    }
}
