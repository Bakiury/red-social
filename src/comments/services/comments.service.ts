import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(Comment) private commentsRepository: Repository<Comment>) {

    }
  
    async getAll(): Promise<Comment[]> {
      return await this.commentsRepository.find({
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
  
    async createComment(data: object): Promise<Comment> {
      const newcomment = await this.commentsRepository.create(data); // const newcomment = new comment(); newcomment.name = name;
  
      return await this.commentsRepository.save(newcomment); // INSERT
    }
  
    async updateComment(id: number, data: object): Promise<Comment> {
      try {
        const commentID = await this.commentsRepository.findOneOrFail(id);
        this.commentsRepository.merge(commentID, data);
  
        return await this.commentsRepository.save(commentID); // UPDATE
      } catch (error) {
        // handle error
        throw error;
      }
    }
  
    async deleteComment(id: number): Promise<Comment> {
      try {
        const commentID = await this.commentsRepository.findOneOrFail(id);
  
        return await this.commentsRepository.remove(commentID); // DELETE
      } catch (error) {
        // handle error
        throw error;
      }
    }
  
    async customQueryTest(): Promise<any> {
      return await this.commentsRepository.createQueryBuilder("comment").select("com_description").where("com_id = :id", { id: 1}).getOne();
    }
}
