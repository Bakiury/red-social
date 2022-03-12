import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { Comment } from '../entities/comment.entity';

@Controller('comments')
export class CommentsController {
    constructor(
        private commentsService: CommentsService
    ) {}
    
    @Get('all')
    getAll(): Promise<Comment[]> {
        return this.commentsService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: number): Promise<Comment> {
        return this.commentsService.getOneById(id);
    }

    @Post()
    create(@Body() body: object): Promise<Comment> {
        return this.commentsService.createComment(body);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() body: object): Promise<Comment> {
        return this.commentsService.updateComment(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<Comment> {
        return this.commentsService.deleteComment(id);
    }
}
