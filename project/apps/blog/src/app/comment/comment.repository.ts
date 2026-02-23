import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { BasePostgresRepository } from "@project/repository";
import { CommentEntity } from "./comment.entity";
import { Comment } from "@project/types";
import { PrismaClientService } from "@project/blog-model";

@Injectable()
export class CommentRepository extends BasePostgresRepository<CommentEntity, Comment> {
  constructor(
    protected override readonly client: PrismaClientService,
  ) {
    super(client, CommentEntity.fromObject);
  }

  public override async findById(id: string): Promise<CommentEntity | null> {
    const document = await this.client.comment.findFirst({
      where: { id },
    });
    if (!document) {
      throw new NotFoundException(`Comment with id: ${id} not found`);
    }
    const comment = this.createEntityFromDocument(document);
    if (!comment) {
      throw new Error('Failed to find comment');
    }
    comment.id = document.id;
    return comment;
  }
  public async findByPostIdAndUserId(postId: string, userId: string): Promise<CommentEntity | null> {
    const document = await this.client.comment.findFirst({
      where: { postId, userId },
    });
    if (!document) {
      return null;
    }
    return this.createEntityFromDocument(document);
  }
  public override async save(entity: CommentEntity): Promise<CommentEntity> {
    const existingComment = await this.findByPostIdAndUserId(entity.postId, entity.userId);
    if (existingComment) {
      throw new ConflictException(`Comment for post with id: ${entity.postId} and user with id: ${entity.userId} already exists`);
    }
    const document = await this.client.comment.create({
      data: { ...entity.toPOJO() },
    });
    const comment = this.createEntityFromDocument(document);
    if (!comment) {
      throw new Error('Failed to create comment');
    }
    comment.id = document.id;
    return comment;
  }

  public override async update(id: string, entity: CommentEntity): Promise<CommentEntity> {
    const document = await this.client.comment.update({
      where: { id },
      data: { ...entity.toPOJO() },
    });
    if (!document) {
      throw new NotFoundException(`Comment with id: ${id} not found`);
    }
    const comment = this.createEntityFromDocument(document);
    if (!comment) {
      throw new Error('Failed to update comment');
    }
    comment.id = document.id;
    return comment;
  }

  public override async delete(id: string): Promise<void> {
    await this.client.comment.delete({
      where: { id },
    });
  }

  public async findByPostId(postId: string, pagination: {limit: number, page: number}): Promise<CommentEntity[]> {
    const { limit, page } = pagination;
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);
    const skip = (safePage - 1) * safeLimit;
    const documents = await this.client.comment.findMany({
      where: { postId },
      skip,
      take: safeLimit,
    });
    const comments = documents.map(document => {
      const comment = this.createEntityFromDocument(document);
      if (!comment) {
        throw new Error('Failed to find comment');
      }
      comment.id = document.id;
      return comment;
    });
    return comments;
  }
}
