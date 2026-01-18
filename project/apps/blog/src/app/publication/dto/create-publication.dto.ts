import { ApiProperty } from "@nestjs/swagger";
import { PublicationType } from "@project/types";

export class CreatePublicationDto {
  @ApiProperty({enum: PublicationType, description: 'publication type', example: 'text'})
  public type!: PublicationType;
  @ApiProperty({type: String, description: 'publication authorId', example: '14320425-9270-4b8d-ab1d-50769f899847'})
  public authorId!: string;
  @ApiProperty({type: Array, description: 'publication tags', example: ['']})
  public tags?: string[];
  @ApiProperty({type: String, description: 'publication title', example: 'My first publication'})
  public title?: string;
  @ApiProperty({type: String, description: 'publication videoUrl', example: 'https://www.youtube.com/videoUrl'})
  public videoUrl?: string;
  @ApiProperty({type: String, description: 'publication announcement', example: 'My publication announcement'})
  public announcement?: string;
  @ApiProperty({type: String, description: 'publication text', example: 'My publication text'})
  public text?: string;
  @ApiProperty({type: File, description: 'publication image', example: 'file.jpg'})
  public image?: File;
  @ApiProperty({type: String, description: 'publication quote author', example: 'Keks'})
  public quoteAuthor?: string;
  @ApiProperty({type: String, description: 'publication link', example: 'https://www.youtube.com/'})
  public link?: string;
}
