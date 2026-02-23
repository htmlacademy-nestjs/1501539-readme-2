import { BasePostgresRepository } from "@project/repository";
import { PublicationEntity } from "./publication.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { SortDirection } from '@project/helpers';
import { PublicationFilters } from "./types/publication-filters.interface";
import { PublicationSortRows } from "./types/publication-sort-rows.enum";
import { Publication } from "@project/types";
import { Prisma, PrismaClientService, PublicationStatus } from "@project/blog-model";

@Injectable()
export class PublicationRepository extends BasePostgresRepository<PublicationEntity, Publication> {

  constructor(
    protected override readonly client: PrismaClientService,
  ) {
    super(client, PublicationEntity.fromObject);
  }

  public override async save(entity: PublicationEntity): Promise<PublicationEntity> {
    const document = await this.client.post.create({
      data: { ...entity.toPOJO() },
    });
    const publication = this.createEntityFromDocument(document);
    if (!publication) {
      throw new Error('Failed to create publication');
    }
    publication.id = document.id;
    return publication;
  }

  public override async findById(id: string): Promise<PublicationEntity | null> {
    const document = await this.client.post.findFirst({
      where: { id },
    });
    if (!document) {
      throw new NotFoundException(`Publication with id: ${id} not found`);
    }
    return this.createEntityFromDocument(document);
  }

  public async findAll(
    filters: PublicationFilters,
    sort: {sortBy: PublicationSortRows, sortDirection: SortDirection },
    pagination: {limit: number, page: number},
  ) {
    const { limit, page } = pagination;
    const { sortBy, sortDirection } = sort;
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);
    const skip = (safePage - 1) * safeLimit;
    const where: Prisma.PostWhereInput = {
      status: PublicationStatus.PUBLISHED,
      ...(filters?.tags ? { tags: { hasEvery: filters.tags } } : {}),
      ...(filters?.title ? { title: { contains: filters.title, mode: 'insensitive' } } : {}),
      ...(filters?.type ? { type: filters.type } : {}),
      ...(filters?.status ? { status: filters.status } : {}),
    };
    const orderBy: Prisma.PostOrderByWithRelationInput = {
      [sortBy]: sortDirection,
    };
    const publications = await this.client.post.findMany({
      where,
      orderBy,
      skip,
      take: safeLimit,
    });
    return publications.map(publication => {
      const document = { ...publication, id: publication.id };
      return this.createEntityFromDocument(document)});
  }

  public async findByAuthorId(authorId: string, pagination: {limit: number, page: number}) {
    const { limit, page } = pagination;
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);
    const skip = (safePage - 1) * safeLimit;
    const publications = await this.client.post.findMany({
      where: { authorId },
      skip,
      take: safeLimit,
    });
    return publications.map(publication => {
      const document = { ...publication, id: publication.id };
      return this.createEntityFromDocument(document)});
  }

  public override async update(id: string, entity: PublicationEntity): Promise<PublicationEntity> {
    const document = await this.client.post.update({
      where: { id },
      data: { ...entity.toPOJO() },
    });
    if (!document) {
      throw new NotFoundException(`Publication with id: ${id} not found`);
    }
    const publication = this.createEntityFromDocument(document);
    if (!publication) {
      throw new Error('Failed to update publication');
    }
    publication.id = document.id;
    return publication;
  }

  public override async delete(id: string): Promise<void> {
    const document = await this.client.post.delete({
      where: { id },
    });
    if (!document) {
      throw new NotFoundException(`Publication with id: ${id} not found`);
    }
  }
}
