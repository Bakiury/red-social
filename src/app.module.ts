import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule, PostsModule, CommentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
