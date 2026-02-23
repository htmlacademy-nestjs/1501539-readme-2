import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdatePublicationDto {
  @ApiProperty({type: Array, description: 'publication tags', example: ['']})
  @IsArray()
  public tags?: string[];
  @ApiProperty({type: String, description: 'publication title', example: 'My first publication'})
  @IsString()
  @IsOptional()
  public title?: string;
  @ApiProperty({type: String, description: 'publication videoUrl', example: 'https://www.youtube.com/videoUrl'})
  @IsString()
  @IsOptional()
  public videoUrl?: string;
  @ApiProperty({type: String, description: 'publication announcement', example: 'My publication announcement'})
  @IsString()
  @IsOptional()
  public announcement?: string;
  @ApiProperty({type: String, description: 'publication text', example: 'My publication text'})
  @IsString()
  @IsOptional()
  public text?: string;
  @ApiProperty({type: File, description: 'publication image', example: 'file.jpg'})
  @IsString()
  @IsOptional()
  public image?: File;
  @ApiProperty({type: String, description: 'publication quote author', example: 'Keks'})
  @IsString()
  @IsOptional()
  public quoteAuthor?: string;
  @ApiProperty({type: String, description: 'publication link', example: 'https://www.youtube.com/'})
  @IsString()
  @IsOptional()
  public link?: string;
}
