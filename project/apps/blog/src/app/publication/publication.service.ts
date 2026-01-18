import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { PublicationEntity } from './publication.entity';
import { PublicationStatus } from '@project/types';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from './publication.constant';
import { PublicationParams } from './types/publication-params.interface';
import { PublicationSortRows } from './types/publication-sort-rows.enum';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { LikeRepository } from '../like/like.repository';
import { CommentRepository } from '../comment/comment.repository';

@Injectable()
export class PublicationService {
  constructor(
    private readonly publicationRepository: PublicationRepository,
    private readonly likeRepository: LikeRepository,
    private readonly commentRepository: CommentRepository
  ) {}

  public async create(dto: CreatePublicationDto) {
    const now = new Date();
    const publication = await new PublicationEntity({
      createdAt: now,
      publicatedAt: now,
      status: PublicationStatus.PUBLISHED,
      likesCount: 0,
      commentsCount: 0,
      ...dto  });
    return await this.publicationRepository.save(publication);
  }

  public async findById(id: string) {
    return await this.publicationRepository.findById(id);
  }

  public async updateById(id: string, dto: UpdatePublicationDto) {
    const publication = await this.publicationRepository.findById(id);
    if (!publication) {
      throw new NotFoundException(`publication with id: ${id} not found`);
    }
    const updatedPublication = Object.assign(publication, dto);
    return await this.publicationRepository.update(id, updatedPublication);
  }

  public async deleteById(id:string) {
    await this.publicationRepository.delete(id);
    await this.commentRepository.deleteByPublicationId(id);
    await this.likeRepository.deleteByPublicationId(id);
  }

  public async findAll(query: PublicationParams) {
    return await this.publicationRepository.findAll(
      { tags: typeof query.tags === 'string' ? [query.tags] : query.tags, title: query.title, type: query.type, status: PublicationStatus.PUBLISHED },
      {sortBy: query.sortBy ?? PublicationSortRows.PUBLICATED_AT, sortDirection: 'desc'},
      {page: isNaN(+query.page) ? DEFAULT_PAGE : +query.page, limit: DEFAULT_LIMIT}
    )
  }

  public async findByAuthorId(authorId: string, page: string) {
    return await this.publicationRepository.findByAuthorId(authorId, {page: isNaN(+page) ? DEFAULT_PAGE : +page, limit: DEFAULT_LIMIT});
  }

}
