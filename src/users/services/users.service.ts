import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {

    }

    async findOne(condition: object): Promise<User> {
      return await this.usersRepository.findOne(condition);
    }
  
    async getAll(): Promise<User[]> {
      return await this.usersRepository.find({
        relations: ['myPost']
      }); // SELECT * FROM user JOIN post
    }
  
    async getOneById(id: number): Promise<User> {
      try {
        const userID = await this.usersRepository.findOneOrFail(id); // SELECT * FROM user WHERE use_id = id;
        
        return userID;
      } catch (error) {
        // handle error
        throw error;
      }
    }
  
    async createUser(data: object): Promise<User> {
      const newUser = await this.usersRepository.create(data); // const newUser = new User(); newUser.name = name;
  
      return await this.usersRepository.save(newUser); // INSERT
    }
  
    async updateUser(id: number, data: object): Promise<User> {
      try {
        const userID = await this.usersRepository.findOneOrFail(id);
        this.usersRepository.merge(userID, data);
  
        return await this.usersRepository.save(userID); // UPDATE
      } catch (error) {
        // handle error
        throw error;
      }
    }
  
    async deleteUser(id: number): Promise<User> {
      try {
        const userID = await this.usersRepository.findOneOrFail(id);
  
        return await this.usersRepository.remove(userID); // DELETE
      } catch (error) {
        // handle error
        throw error;
      }
    }
  
    async customQueryTest(): Promise<any> {
      return await this.usersRepository.createQueryBuilder("user").select("use_name").where("use_id = :id OR use_name = :name", { id: 1, name: "John" }).getOne();
    }
}
