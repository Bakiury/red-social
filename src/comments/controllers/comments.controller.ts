import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UnauthorizedException } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { Comment } from '../entities/comment.entity';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Controller('comments')
export class CommentsController {
    constructor(
        private commentsService: CommentsService,
        private jwtService: JwtService
    ) {}
    
    @Get('all')
    async getAll(@Req() request: Request): Promise<Comment[]> {
        try {
            const cookie = request.cookies['jwt']; // Request a cookie
            const data = await this.jwtService.verifyAsync(cookie); // When the cookie is retrieved and still valid is going to return the user data (use_id and cookie's informations)
    
            if (!data) {
                throw new UnauthorizedException();
            }

            return await this.commentsService.getAll();
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    @Get(':id')
    async getOne(@Req() request: Request, @Param('id') id: number): Promise<Comment> {
        try {
            const cookie = request.cookies['jwt']; // Request a cookie
            const data = await this.jwtService.verifyAsync(cookie); // When the cookie is retrieved and still valid is going to return the user data (use_id and cookie's informations)
    
            if (!data) {
                throw new UnauthorizedException();
            }

            return await this.commentsService.getOneById(id);
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    @Post()
    async create(@Req() request: Request, @Body() body: object): Promise<Comment> {
        try {
            const cookie = request.cookies['jwt']; // Request a cookie
            const data = await this.jwtService.verifyAsync(cookie); // When the cookie is retrieved and still valid is going to return the user data (use_id and cookie's informations)
    
            if (!data) {
                throw new UnauthorizedException();
            }

            return await this.commentsService.createComment(body);
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    @Patch(':id')
    async update(@Req() request: Request, @Param('id') id: number, @Body() body: object): Promise<Comment> {
        try {
            const cookie = request.cookies['jwt']; // Request a cookie
            const data = await this.jwtService.verifyAsync(cookie); // When the cookie is retrieved and still valid is going to return the user data (use_id and cookie's informations)
    
            if (!data) {
                throw new UnauthorizedException();
            }

            return await this.commentsService.updateComment(id, body);
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    @Delete(':id')
    async delete(@Req() request: Request, @Param('id') id: number): Promise<Comment> {
        try {
            const cookie = request.cookies['jwt']; // Request a cookie
            const data = await this.jwtService.verifyAsync(cookie); // When the cookie is retrieved and still valid is going to return the user data (use_id and cookie's informations)
    
            if (!data) {
                throw new UnauthorizedException();
            }

            return await this.commentsService.deleteComment(id);
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}
