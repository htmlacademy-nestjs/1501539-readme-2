import { Entity } from '@project/repository';
import { Comment } from '@project/types'

export class CommentEntity implements Comment, Entity<string> {
  public id?:string;
  public postId!: string;
  public content!: string;
  public userId!: string;
  public createdAt!: Date;

  constructor(comment: Comment) {
    this.populate(comment);
  }

  public populate(comment: Comment) {
    this.postId = comment.postId;
    this.content = comment.content;
    this.userId = comment.userId;
    this.createdAt = comment.createdAt;
  }

  public toPOJO() {
    return {
      id: this.id,
      postId: this.postId,
      content: this.content,
      userId: this.userId,
      createdAt: this.createdAt,
    }
  }

  public static fromObject(object: Comment): CommentEntity {
    return new CommentEntity(object);
  }
}
