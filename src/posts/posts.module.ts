import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { MyPost } from './entities/post.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([MyPost]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '1d'}
    })
  ],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
