import { Module, forwardRef } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { LikeRepository } from './like.repository';
import { PublicationModule } from '../publication/publication.module';

@Module({
  imports: [forwardRef(() => PublicationModule)],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository],
  exports: [LikeRepository]
})
export class LikeModule {}
