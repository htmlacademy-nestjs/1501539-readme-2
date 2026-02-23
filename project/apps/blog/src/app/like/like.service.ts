import { Injectable, NotFoundException } from '@nestjs/common';
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
    const publication = await this.publicationRepository.findById(dto.postId);
    if (!publication) {
      throw new NotFoundException(`Publication with id: ${dto.postId} not found`);
    }
    const newPublication = Object.assign(publication, { ...publication, likesCount: publication.likesCount + 1})
    await this.publicationRepository.update(newPublication.id!, newPublication);
    return like;
  }

  public async find(postId: string, userId: string) {
    const like = await this.likeRepository.findByPostIdAndUserId(postId, userId);
    if (!like) {
      throw new NotFoundException(`Like for post ${postId} and user ${userId} not found`);
    }
    return like;
  }

  public async delete(postId: string, userId: string) {
    const like = await this.find(postId, userId);
    const publication = await this.publicationRepository.findById(postId);
    if (!publication) {
      throw new NotFoundException(`Publication with id: ${postId} not found`);
    }
    const newPublication = Object.assign(publication, { likesCount: publication.likesCount > 0 ? publication.likesCount - 1 : 0 });
    await this.likeRepository.delete(like!.id!);
    await this.publicationRepository.update(newPublication.id!, newPublication);
  }
}
