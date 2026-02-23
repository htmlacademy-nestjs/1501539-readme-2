import { Module } from '@nestjs/common';
import { PublicationModule } from './publication/publication.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { PrismaClientModule } from '@project/blog-model';
import { ConfigBlogModule } from '@project/config-blog';

@Module({
  imports: [ConfigBlogModule, PublicationModule, CommentModule, LikeModule, PrismaClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
