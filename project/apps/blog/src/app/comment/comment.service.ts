import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from './comment.constant';
import { PublicationRepository } from '../publication/publication.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly publicationRepository: PublicationRepository
  ) {}

  public async create(dto: CreateCommentDto) {
    const commentEntity = new CommentEntity({...dto, createdAt: new Date()});
    const comment = await this.commentRepository.save(commentEntity);
    const publication = await this.publicationRepository.findById(dto.publicationId);
    if (!publication) {
      throw new NotFoundException(`publication with id: ${dto.publicationId} not found`);
    }
    const updatedPublication = Object.assign(publication, {...publication, commentsCount: publication.commentsCount + 1});
    await this.publicationRepository.update(updatedPublication.id, updatedPublication);
    return comment;
  }

  public async findByPublicationId(publicationId: string, page: string) {
    return await this.commentRepository.findByPublicationId(publicationId, {page: isNaN(+page) ? DEFAULT_PAGE : +page, limit: DEFAULT_LIMIT} );
  }

  public async deleteById(id: string, authorId: string) {
    const comment = await this.commentRepository.findById(id);
    if (!comment) {
      throw new NotFoundException(`publication with id: ${id} not found`);
    }
    const publication = await this.publicationRepository.findById(comment.publicationId);
    if (!publication) {
      throw new NotFoundException(`publication with id: ${comment.publicationId} not found`);
    }
    const updatedPublication = Object.assign(publication, {...publication, commentsCount: (publication.commentsCount - 1) > 0 ? publication.commentsCount - 1 : 0});
    await this.commentRepository.delete(id);
    await this.publicationRepository.update(updatedPublication.id, updatedPublication);
  }
}
