import { Entity } from "@project/repository";
import { Like } from "@project/types";

export class LikeEntity implements Like, Entity<string> {
  public id?: string;
  public postId!: string;
  public userId!: string;

  constructor(like: Like) {
    this.populate(like);
  }

  public populate(like:Like) {
    this.userId = like.userId;
    this.postId = like.postId;
  }

  public toPOJO() {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId
    }
  }

  public static fromObject(object: Like): LikeEntity {
    return new LikeEntity(object);
  }
}
