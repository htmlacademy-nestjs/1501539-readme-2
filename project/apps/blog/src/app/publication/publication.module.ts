import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationRepository } from './publication.repository';

@Module({
  providers: [PublicationService, PublicationRepository],
  controllers: [PublicationController],
  exports: [PublicationRepository]
})
export class PublicationModule {}
