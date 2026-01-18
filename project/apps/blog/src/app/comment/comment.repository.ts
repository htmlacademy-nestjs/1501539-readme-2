import { Injectable } from "@nestjs/common";
import { BaseMemoryRepository } from "@project/repository";
import { CommentEntity } from "./comment.entity";

@Injectable()
export class CommentRepository extends BaseMemoryRepository<CommentEntity> {
  public async findByPublicationId(publicationId: string, pagination: {limit: number, page: number}) {
    const entityArray = Array.from(this.entities.values());
    const {limit, page} = pagination;
    return entityArray.filter((entity) => entity.publicationId === publicationId).slice(page*limit, (page+1)*limit);
  }
}
