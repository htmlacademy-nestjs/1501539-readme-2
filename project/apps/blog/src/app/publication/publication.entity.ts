import { Entity } from "@project/repository";
import { Publication, PublicationStatus, PublicationType } from "@project/types";

export class PublicationEntity implements Publication, Entity<string, Publication> {
  public id?: string;
  public type!: PublicationType;
  public createdAt!: Date;
  public publicatedAt!: Date | null;
  public authorId!: string;
  public status!: PublicationStatus;
  public likesCount!: number;
  public commentsCount!: number;
  public tags!: string[];
  public title!: string | null;
  public videoUrl!: string | null;
  public announcement!: string | null;
  public text!: string | null;
  public image!: string | null;
  public quoteAuthor!: string | null;
  public link!: string | null;

  constructor(publication: Publication) {
    this.populate(publication);
  }

  public populate(publication: Publication) {
    this.id = publication.id;
    this.type = publication.type;
    this.createdAt = publication.createdAt;
    this.publicatedAt = publication.publicatedAt;
    this.authorId = publication.authorId;
    this.status = publication.status;
    this.likesCount = publication.likesCount;
    this.commentsCount = publication.commentsCount;
    this.tags = publication?.tags ?? [];
    this.title = publication?.title ?? null;
    this.videoUrl = publication?.videoUrl ?? null;
    this.announcement = publication?.announcement ?? null;
    this.text = publication?.text ?? null;
    this.image = publication?.image ?? null;
    this.quoteAuthor = publication?.quoteAuthor ?? null;
    this.link = publication?.link ?? null;
  }

  public toPOJO(): Publication {
    return {
      id: this.id,
      type: this.type,
      createdAt: this.createdAt,
      publicatedAt: this.publicatedAt,
      authorId: this.authorId,
      status: this.status,
      likesCount: this.likesCount,
      commentsCount: this.commentsCount,
      tags: this.tags,
      title: this.title,
      videoUrl: this.videoUrl,
      announcement: this.announcement,
      text: this.text,
      image: this.image,
      quoteAuthor: this.quoteAuthor,
      link: this.link
    }
  }

  public static fromObject(object: Publication): PublicationEntity {
    return new PublicationEntity(object);
  }
}
