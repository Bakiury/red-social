import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    @Post('login')
    async login(
        @Body('use_email') use_email: string,
        @Body('use_password') use_password: string,
        @Res({passthrough: true}) response: Response // For frontend to get credentials (cookie). This is used by enabling cors in "main.ts" file too
    ): Promise<any> {
        const user = await this.usersService.findOne({use_email});

        // Valid if password or email are valid
        if (!user || !await bcrypt.compare(use_password, user.use_password)) {
            throw new BadRequestException('Invalid credentials');
        }

        // Generate a token
        const jwt = await this.jwtService.signAsync({id: user.use_id});

        response.cookie('jwt', jwt, {httpOnly: true}); // For only the backend will use jwt and frontend won't be able to use it

        return {
            message: 'success'
        };
    }

    @Get('auth_user')
    async user(@Req() request: Request): Promise<any> {
        try {
            const cookie = request.cookies['jwt']; // Request a cookie
            const data = await this.jwtService.verifyAsync(cookie); // When the cookie is retrieved and still valid is going to return the user data (use_id and cookie's informations)

            if (!data) {
                throw new UnauthorizedException();
            }
            
            // To return user's information according to their valid and unexpired cookie
            const user = await this.usersService.findOne({use_id: data.id});

            // Remove the user's password
            const {use_password, ...result} = user;

            return result;   
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response): Promise<any> {
        response.clearCookie('jwt');

        return {
            message: 'success'
        }
    }
    
    @Get('all')
    async getAll(@Req() request: Request): Promise<User[]> {
        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
    
            if (!data) {
                throw new UnauthorizedException();
            }

            return await this.usersService.getAll();
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    @Get(':id')
    async getOne(@Req() request: Request, @Param('id') id: number): Promise<User> {
        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
    
            if (!data) {
                throw new UnauthorizedException();
            }

            return await this.usersService.getOneById(id);
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    @Post()
    async create(
        @Body('use_name') use_name: string,
        @Body('use_last_name') use_last_name: string,
        @Body('use_email') use_email: string,
        @Body('use_password') use_password: string,
        @Body('use_profile_image') use_profile_image: string,
        @Body('use_birthday') use_birthday: Date,
        @Body('use_description') use_description: string
    ): Promise<User> {
        const hashedPassword = await bcrypt.hash(use_password, 12);

        const user = await this.usersService.createUser({
            use_name,
            use_last_name,
            use_email,
            use_password: hashedPassword,
            use_profile_image,
            use_birthday,
            use_description
        });

        // Remove the user's password
        delete user.use_password;

        return user;
    }

    @Patch(':id')
    async update(@Req() request: Request, @Param('id') id: number, @Body() body: object): Promise<User> {
        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
    
            if (!data) {
                throw new UnauthorizedException();
            }

            return await this.usersService.updateUser(id, body);
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    @Delete(':id')
    async delete(@Req() request: Request, @Param('id') id: number): Promise<User> {
        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
    
            if (!data) {
                throw new UnauthorizedException();
            }

            return await this.usersService.deleteUser(id);
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}
