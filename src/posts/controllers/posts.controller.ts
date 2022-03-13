import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UnauthorizedException } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { MyPost } from '../entities/post.entity';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Controller('posts')
export class PostsController {
    constructor(
        private postsService: PostsService,
        private jwtService: JwtService
    ) {}
    
    @Get('all')
    async getAll(@Req() request: Request): Promise<MyPost[]> {
        try {
            const cookie = request.cookies['jwt']; // Request a cookie
            const data = await this.jwtService.verifyAsync(cookie); // When the cookie is retrieved and still valid is going to return the user data (use_id and cookie's informations)
    
            if (!data) {
                throw new UnauthorizedException();
            }

            return await this.postsService.getAll();
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    @Get(':id')
    async getOne(@Req() request: Request, @Param('id') id: number): Promise<MyPost> {
        try {
            const cookie = request.cookies['jwt']; // Request a cookie
            const data = await this.jwtService.verifyAsync(cookie); // When the cookie is retrieved and still valid is going to return the user data (use_id and cookie's informations)
    
            if (!data) {
                throw new UnauthorizedException();
            }

            return await this.postsService.getOneById(id);
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    @Post()
    async create(@Req() request: Request, @Body() body: object): Promise<MyPost> {
        try {
            const cookie = request.cookies['jwt']; // Request a cookie
            const data = await this.jwtService.verifyAsync(cookie); // When the cookie is retrieved and still valid is going to return the user data (use_id and cookie's informations)
    
            if (!data) {
                throw new UnauthorizedException();
            }

            return await this.postsService.createPost(body);
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    @Patch(':id')
    async update(@Req() request: Request, @Param('id') id: number, @Body() body: object): Promise<MyPost> {
        try {
            const cookie = request.cookies['jwt']; // Request a cookie
            const data = await this.jwtService.verifyAsync(cookie); // When the cookie is retrieved and still valid is going to return the user data (use_id and cookie's informations)
    
            if (!data) {
                throw new UnauthorizedException();
            }

            return await this.postsService.updatePost(id, body);
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    @Delete(':id')
    async delete(@Req() request: Request, @Param('id') id: number): Promise<MyPost> {
        try {
            const cookie = request.cookies['jwt']; // Request a cookie
            const data = await this.jwtService.verifyAsync(cookie); // When the cookie is retrieved and still valid is going to return the user data (use_id and cookie's informations)

            if (!data) {
                throw new UnauthorizedException();
            }
            return await this.postsService.deletePost(id);
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}
