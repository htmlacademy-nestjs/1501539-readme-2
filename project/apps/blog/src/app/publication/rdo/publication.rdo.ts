import { Expose } from "class-transformer";
import { PublicationType, PublicationStatus } from '@project/types';
import { ApiProperty } from "@nestjs/swagger";
import type { User }  from '@project/types';

export class PublicationRdo {
  @ApiProperty({type: String, example: '14320425-9270-4b8d-ab1d-50769f899847', description: 'publication id'})
  @Expose()
  public id!: string;

  @ApiProperty({enum: PublicationType, example: 'text', description: 'publication type'})
  @Expose()
  public type!: PublicationType;

  @ApiProperty({type: Array, example: [''], description: 'publication tags'})
  @Expose()
  public tags!: string[];

  @ApiProperty({type: Date, example: new Date(), description: 'publication created date'})
  @Expose()
  public createdAt!: Date;

  @ApiProperty({type: Date, example: new Date(), description: 'publication publicated date'})
  @Expose()
  public publicatedAt!: Date;

  @ApiProperty({
    type: Object,
    example: {
      "id": "07a0f783-b4cb-4fa2-87ac-a358fcdd4b24",
      "email": "user@notfound.local",
      "name": "Keks",
      "createdAt": "2026-01-10T12:45:46.016Z",
      "followersCount": 0,
      "publicationsCount": 0
    },
    description: 'publication author'})
  @Expose()
  public author!: User;

  @ApiProperty({enum: PublicationStatus, example: 'published', description: 'publication status'})
  @Expose()
  public status!: PublicationStatus;

  @ApiProperty({type: Number, example: 1, description: 'publication likes count'})
  @Expose()
  public likesCount!: number;

  @ApiProperty({type: Number, example: 2, description: 'publication comments count'})
  @Expose()
  public commentsCount!: number;
}
