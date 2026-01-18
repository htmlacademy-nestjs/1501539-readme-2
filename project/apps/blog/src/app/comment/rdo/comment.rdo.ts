import { Expose } from "class-transformer";
import type { User } from "@project/types";
import { ApiProperty } from "@nestjs/swagger";

export class CommentRdo {
  @ApiProperty({type: String, description: 'comment id', example: 'e483e4ee-cc31-49e8-8a52-cf05c1c6db2c'})
  @Expose()
  public id!:string;

  @ApiProperty({type: String, description: 'comment text', example: "example text"})
  @Expose()
  public text!:string;

  @ApiProperty({type: String, description: 'publication id', example: 'e483e4ee-cc31-49e8-8a52-cf05c1c6db2c'})
  @Expose()
  public publicationId!: string;

  @ApiProperty({type: Date, example: new Date(), description: 'comment created date'})
  @Expose()
  public createdAt!: string;

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
}
