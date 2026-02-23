import { BasePostgresRepository } from "@project/repository";
import { LikeEntity } from "./like.entity";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Like } from "@project/types";
import { PrismaClientService } from "@project/blog-model";

@Injectable()
export class LikeRepository extends BasePostgresRepository<LikeEntity, Like> {
  constructor(
    protected override readonly client: PrismaClientService,
  ) {
    super(client, LikeEntity.fromObject);
  }

  public override async findById(id: string): Promise<LikeEntity | null> {
    const document = await this.client.like.findFirst({
      where: { id },
    });
    if (!document) {
      throw new NotFoundException(`Like with id: ${id} not found`);
    }
    return this.createEntityFromDocument(document);
  }

  public override async save(entity: LikeEntity): Promise<LikeEntity> {
    const existingLike = await this.findByPostIdAndUserId(entity.postId, entity.userId);
    if (existingLike) {
      throw new ConflictException(`Like for post with id: ${entity.postId} and user with id: ${entity.userId} already exists`);
    }
    const document = await this.client.like.create({
      data: { ...entity.toPOJO() },
    });
    const like = this.createEntityFromDocument(document);
    if (!like) {
      throw new Error('Failed to create like');
    }
    like.id = document.id;
    return like;
  }

  public override async update(id: string, entity: LikeEntity): Promise<LikeEntity> {
    const document = await this.client.like.update({
      where: { id },
      data: { ...entity.toPOJO() },
    });
    if (!document) {
      throw new NotFoundException(`Like with id: ${id} not found`);
    }
    const like = this.createEntityFromDocument(document);
    if (!like) {
      throw new Error('Failed to update like');
    }
    like.id = document.id;
    return like;
  }

  public override async delete(id: string): Promise<void> {
    const document = await this.client.like.delete({
      where: { id },
    });
    if (!document) {
      throw new NotFoundException(`Like with id: ${id} not found`);
    }
  }

  public async findByPostIdAndUserId(postId: string, userId: string): Promise<LikeEntity | null> {
    const document = await this.client.like.findFirst({
      where: { postId, userId },
    });
    if (!document) {
      return null;
    }
    const like = this.createEntityFromDocument(document);
    if (like) like.id = document.id;
    return like;
  }

  public async findAll(): Promise<LikeEntity[]> {
    const documents = await this.client.like.findMany();
    return documents.map(document => {
      const like = this.createEntityFromDocument(document);
      if (!like) {
        throw new Error('Failed to find like');
      }
      like.id = document.id;
      return like;
    });
  }
}
