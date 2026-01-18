import { Expose } from "class-transformer";
import { PublicationRdo } from "./publication.rdo";
import { ApiProperty } from "@nestjs/swagger";

export class VideoPublicationRdo extends PublicationRdo {
  @ApiProperty({type: String, example: 'example title', description: 'publication title'})
  @Expose()
  public title!: string;

  @ApiProperty({type: String, description: 'publication videoUrl', example: 'https://www.youtube.com/videoUrl'})
  @Expose()
  public videoUrl!: string;
}
