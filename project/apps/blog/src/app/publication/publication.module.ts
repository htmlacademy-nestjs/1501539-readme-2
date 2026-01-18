import { Module, forwardRef } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationRepository } from './publication.repository';
import { LikeModule } from '../like/like.module';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [forwardRef(() => LikeModule), forwardRef(() => CommentModule)],
  providers: [PublicationService, PublicationRepository],
  controllers: [PublicationController],
  exports: [PublicationRepository]
})
export class PublicationModule {}
