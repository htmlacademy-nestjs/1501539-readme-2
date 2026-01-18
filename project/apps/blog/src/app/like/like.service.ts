import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { LikeEntity } from './like.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { PublicationRepository } from '../publication/publication.repository';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly publicationRepository: PublicationRepository
  ) {}

  public async post(dto: CreateLikeDto) {
    const likeEntity = new LikeEntity(dto);
    const like = await this.likeRepository.save(likeEntity);
    const publication = await this.publicationRepository.findById(dto.publicationId);
    if (!publication) {
      throw new NotFoundException(`Publication with id: ${dto.publicationId} not found`);
    }
    if (publication.authorId !== dto.authorId) {
      throw new ConflictException('Only author can like publication');
    }
    const newPublication = Object.assign(publication, { ...publication, likesCount: publication.likesCount + 1})
    await this.publicationRepository.update(newPublication.id, newPublication);
    return like;
  }

  public async find(publicationId: string, authorId: string) {
    return await this.likeRepository.findByPublicationAndAuthorId(publicationId, authorId);
  }

  public async delete(publicationId: string, authorId: string) {
    const like = await this.find(publicationId, authorId);
    const publication = await this.publicationRepository.findById(publicationId);
    if (!publication) {
      throw new NotFoundException(`Publication with id: ${publicationId} not found`);
    }
    if (publication.authorId !== authorId) {
      throw new ConflictException('Only author can like publication');
    }
    const newPublication = Object.assign(publication, { likesCount: publication.likesCount > 0 ? publication.likesCount - 1 : 0 });
    await this.likeRepository.delete(like.id);
    await this.publicationRepository.update(newPublication.id, newPublication);
  }
}
