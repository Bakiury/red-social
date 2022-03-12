import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {

    }
  
    getAll(): Promise<User[]> {
      return this.usersRepository.find(); // SELECT * FROM user
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
  
    createUser(data: object): Promise<User> {
      console.log(data);
      const newUser = this.usersRepository.create(data); // const newUser = new User(); newUser.name = name;
  
      return this.usersRepository.save(newUser); // INSERT
    }
  
    async updateUser(id: number, data: object): Promise<User> {
      try {
        const userID = await this.usersRepository.findOneOrFail(id);
        this.usersRepository.merge(userID, data);
  
        return this.usersRepository.save(userID); // UPDATE
      } catch (error) {
        // handle error
        throw error;
      }
    }
  
    async deleteUser(id: number): Promise<User> {
      try {
        const userID = await this.usersRepository.findOneOrFail(id);
  
        return this.usersRepository.remove(userID); // DELETE
      } catch (error) {
        // handle error
        throw error;
      }
    }
  
    customQueryTest(): any {
      return this.usersRepository.createQueryBuilder("user").select("use_name").where("use_id = :id OR use_name = :name", { id: 1, name: "John" }).getOne();
    }
}
