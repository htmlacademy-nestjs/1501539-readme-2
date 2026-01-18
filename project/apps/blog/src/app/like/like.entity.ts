import { Entity } from "@project/repository";
import { Like } from "@project/types";

export class LikeEntity implements Like, Entity<string> {
  public id?: string;
  public publicationId!: string;
  public authorId!: string;

  constructor(like: Like) {
    this.populate(like);
  }

  public populate(like:Like) {
    this.authorId = like.authorId;
    this.publicationId = like.publicationId;
  }

  public toPOJO() {
    return {
      id: this.id,
      publicationId: this.publicationId,
      authorId: this.authorId
    }
  }
}
