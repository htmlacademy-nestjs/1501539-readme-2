import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateCommentDto {
  @ApiProperty({type: String, description: 'post id', example: 'e483e4ee-cc31-49e8-8a52-cf05c1c6db2c'})
  @IsString()
  @IsNotEmpty()
  public postId!: string;
  @ApiProperty({type: String, description: 'comment text', example: "example text"})
  @IsString()
  @IsNotEmpty()
  public content!: string;
  @ApiProperty({type: String, description: 'user id', example: 'e483e4ee-cc31-49e8-8a52-cf05c1c6db2c'})
  @IsString()
  @IsNotEmpty()
  public userId!: string;
}
