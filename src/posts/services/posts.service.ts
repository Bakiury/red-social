import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MyPost } from '../entities/post.entity';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(MyPost) private postsRepository: Repository<MyPost>) {

    }
  
    getAll(): Promise<MyPost[]> {
      return this.postsRepository.find({
        relations: ['pos_use_id', 'comment']
      }); // SELECT * FROM my_post JOIN user
    }
  
    async getOneById(id: number): Promise<MyPost> {
      try {
        const postID = await this.postsRepository.findOneOrFail(id); // SELECT * FROM my_post WHERE pos_id = id;
        return postID;
      } catch (error) {
        // handle error
        throw error;
      }
    }
  
    createPost(data: object): Promise<MyPost> {
      const newPost = this.postsRepository.create(data); // const newPost = new MyPost(); newPost.name = name;
  
      return this.postsRepository.save(newPost); // INSERT
    }
  
    async updatePost(id: number, data: object): Promise<MyPost> {
      try {
        const postID = await this.postsRepository.findOneOrFail(id);
        this.postsRepository.merge(postID, data);
  
        return this.postsRepository.save(postID); // UPDATE
      } catch (error) {
        // handle error
        throw error;
      }
    }
  
    async deletePost(id: number): Promise<MyPost> {
      try {
        const postID = await this.postsRepository.findOneOrFail(id);
  
        return this.postsRepository.remove(postID); // DELETE
      } catch (error) {
        // handle error
        throw error;
      }
    }
  
    customQueryTest(): any {
      return this.postsRepository.createQueryBuilder("my_post").select("pos_description").where("pos_id = :id", { id: 1}).getOne();
    }
}
