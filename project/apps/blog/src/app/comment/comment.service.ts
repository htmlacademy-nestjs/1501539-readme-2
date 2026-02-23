import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { PublicationRepository } from '../publication/publication.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from './comment.constant';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly publicationRepository: PublicationRepository,
  ) {}

  public async create(dto: CreateCommentDto) {
    const commentEntity = new CommentEntity({ ...dto, createdAt: new Date() });
    const comment = await this.commentRepository.save(commentEntity);
    const publication = await this.publicationRepository.findById(dto.postId);
    if (publication) {
      const updated = Object.assign(publication, {
        ...publication,
        commentsCount: publication.commentsCount + 1,
      });
      await this.publicationRepository.update(publication.id!, updated);
    }
    return comment;
  }

  public async findByPostId(postId: string, page: string) {
    return await this.commentRepository.findByPostId(postId, {
      page: isNaN(+page) ? DEFAULT_PAGE : +page,
      limit: DEFAULT_LIMIT,
    });
  }

  public async deleteById(id: string, userId: string) {
    const comment = await this.commentRepository.findById(id);
    if (!comment) {
      throw new NotFoundException(`Comment with id: ${id} not found`);
    }
    const publication = await this.publicationRepository.findById(comment.postId);
    if (publication) {
      const updated = Object.assign(publication, {
        commentsCount: Math.max(0, publication.commentsCount - 1),
      });
      await this.publicationRepository.update(publication.id!, updated);
    }
    await this.commentRepository.delete(comment.id!);
  }
}
