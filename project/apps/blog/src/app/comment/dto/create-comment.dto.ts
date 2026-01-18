import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
  @ApiProperty({type: String, description: 'publication id', example: 'e483e4ee-cc31-49e8-8a52-cf05c1c6db2c'})
  public publicationId!: string;
  @ApiProperty({type: String, description: 'comment text', example: "example text"})
  public text!: string;
  @ApiProperty({
    type: String,
    example: 'e483e4ee-cc31-49e8-8a52-cf05c1c6db2c',
    description: 'publication author id'})
  public authorId!: string;
}
