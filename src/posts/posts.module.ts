import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { MyPost } from './entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MyPost])],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
