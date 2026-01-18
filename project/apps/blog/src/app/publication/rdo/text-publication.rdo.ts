import { Expose } from "class-transformer";
import { PublicationRdo } from "./publication.rdo";
import { ApiProperty } from "@nestjs/swagger";

export class TextPublicationRdo extends PublicationRdo {
  @ApiProperty({type: String, example: 'example title', description: 'publication title'})
  @Expose()
  public title!: string;

  @ApiProperty({type: String, example: 'example announcement', description: 'publication announcement'})
  @Expose()
  public announcement!: string;

  @ApiProperty({type: String, example: 'example text', description: 'publication text'})
  @Expose()
  public text!: string;
}
