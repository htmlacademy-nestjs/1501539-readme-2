import { Entity } from '@project/repository';
import { Comment } from '@project/types'

export class CommentEntity implements Comment, Entity<string> {
  public id?:string;
  public publicationId!: string;
  public text!: string;
  public authorId!: string;
  public createdAt!: Date;

  constructor(comment: Comment) {
    this.populate(comment);
  }

  public populate(comment: Comment) {
    this.publicationId = comment.publicationId;
    this.text = comment.text;
    this.authorId = comment.authorId;
    this.createdAt = comment.createdAt;
  }

  public toPOJO() {
    return {
      id: this.id,
      publicationId: this.publicationId,
      text: this.text,
      authorId: this.authorId,
      createdAt: this.createdAt,
    }
  }
}
