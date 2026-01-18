import { Entity } from "@project/repository";
import { Publication, PublicationStatus, PublicationType } from "@project/types";

export class PublicationEntity implements Publication, Entity<string> {
  public id?: string;
  public type!: PublicationType;
  public createdAt!: Date;
  public publicatedAt!: Date;
  public authorId!: string;
  public status!: PublicationStatus;
  public likesCount!: number;
  public commentsCount!: number;
  public tags?: string[];
  public title?: string;
  public videoUrl?: string;
  public announcement?: string;
  public text?: string;
  public image?: File;
  public quoteAuthor?: string;
  public link?: string;

  constructor(publication: Publication) {
    this.populate(publication);
  }

  public populate(publication: Publication) {
    this.type = publication.type;
    this.createdAt = publication.createdAt;
    this.publicatedAt = publication.publicatedAt;
    this.authorId = publication.authorId;
    this.status = publication.status;
    this.likesCount = publication.likesCount;
    this.commentsCount = publication.commentsCount;
    this.tags = publication?.tags;
    this.title = publication?.title;
    this.videoUrl = publication?.videoUrl;
    this.announcement = publication?.announcement;
    this.text = publication?.text;
    this.image = publication?.image;
    this.quoteAuthor = publication?.quoteAuthor;
    this.link = publication?.link;
  }

  public toPOJO() {
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
}
