import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { MyPost } from '../entities/post.entity';

@Controller('posts')
export class PostsController {
    constructor(
        private postsService: PostsService
    ) {}
    
    @Get('all')
    getAll(): Promise<MyPost[]> {
        return this.postsService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: number): Promise<MyPost> {
        return this.postsService.getOneById(id);
    }

    @Post()
    create(@Body() body: object): Promise<MyPost> {
        return this.postsService.createPost(body);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() body: object): Promise<MyPost> {
        return this.postsService.updatePost(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<MyPost> {
        return this.postsService.deletePost(id);
    }
}
