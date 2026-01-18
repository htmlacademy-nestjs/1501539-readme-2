import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { PublicationModule } from '../publication/publication.module';

@Module({
  imports: [PublicationModule],
  providers: [CommentService, CommentRepository],
  controllers: [CommentController]
})
export class CommentModule {}
