import { Expose } from "class-transformer";
import { PublicationRdo } from "./publication.rdo";
import { ApiProperty } from "@nestjs/swagger";

export class QuotePublicationRdo extends PublicationRdo {
  @ApiProperty({type: String, example: 'example text', description: 'publication text'})
  @Expose()
  public text!: string;

  @ApiProperty({type: String, example: 'Confucius', description: 'publication quote author'})
  @Expose()
  public quoteAuthor!: string;
}
