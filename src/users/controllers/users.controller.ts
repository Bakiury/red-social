import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}
    
    @Get('all')
    getAll(): Promise<User[]> {
        return this.usersService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: number): Promise<User> {
        return this.usersService.getOneById(id);
    }

    @Post()
    create(@Body() body: object): Promise<User> {
        return this.usersService.createUser(body);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() body: object): Promise<User> {
        return this.usersService.updateUser(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<User> {
        return this.usersService.deleteUser(id);
    }
}
