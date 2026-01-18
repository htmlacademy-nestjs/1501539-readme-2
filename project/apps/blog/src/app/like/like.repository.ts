import { BaseMemoryRepository } from "@project/repository";
import { LikeEntity } from "./like.entity";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class LikeRepository extends BaseMemoryRepository<LikeEntity> {
  public async findByPublicationAndAuthorId(publicationId: string, authorId: string) {
    const entityArray = Array.from(this.entities.values());
    const like = entityArray.find((entity) => entity.authorId === authorId && entity.publicationId === publicationId);
    if (!like) {
      throw new NotFoundException(`Like for publication with id:${publicationId} not found`);
    }
    return like
  }
}
