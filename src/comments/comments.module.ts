import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsService } from './services/comments.service';
import { CommentsController } from './controllers/comments.controller';
import { Comment } from './entities/comment.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '1d'}
    })
  ],
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}
