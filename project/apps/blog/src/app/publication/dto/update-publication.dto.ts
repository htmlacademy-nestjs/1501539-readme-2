import { ApiProperty } from "@nestjs/swagger";

export class UpdatePublicationDto {
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
