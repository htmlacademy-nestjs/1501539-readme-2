import { Module } from '@nestjs/common';
import { PublicationModule } from './publication/publication.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [PublicationModule, CommentModule, LikeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
