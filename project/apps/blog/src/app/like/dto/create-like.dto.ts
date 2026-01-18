import { ApiProperty } from "@nestjs/swagger";

export class CreateLikeDto {
  @ApiProperty({ type: String, description: 'publication id', example: 'e483e4ee-cc31-49e8-8a52-cf05c1c6db2c' })
  public publicationId!: string;

  @ApiProperty({ type: String, description: 'author id', example: 'e483e4ee-cc31-49e8-8a52-cf05c1c6db2c' })
  public authorId!: string;
}
