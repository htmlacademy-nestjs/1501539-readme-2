import { Expose } from "class-transformer";
import { PublicationRdo } from "./publication.rdo";
import { ApiProperty } from "@nestjs/swagger";

export class LinkPublicationRdo extends PublicationRdo {
  @ApiProperty({type: String, example: 'http://localhost:3000/', description: 'publication link'})
  @Expose()
  public link!: string;

  @ApiProperty({type: String, example: 'example text', description: 'publication text'})
  @Expose()
  public text!: string;
}
