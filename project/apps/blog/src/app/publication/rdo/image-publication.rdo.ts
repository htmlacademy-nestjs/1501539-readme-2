import { Expose } from "class-transformer";
import { PublicationRdo } from "./publication.rdo";
import { ApiProperty } from "@nestjs/swagger";

export class ImagePublicationRdo extends PublicationRdo {
  @ApiProperty({type: File, example: '/image.png', description: 'publication image'})
  @Expose()
  public image!: File;
}
