import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateLikeDto {
  @ApiProperty({ type: String, description: 'post id', example: 'e483e4ee-cc31-49e8-8a52-cf05c1c6db2c' })
  @IsString()
  public postId!: string;

  @ApiProperty({ type: String, description: 'user id', example: 'e483e4ee-cc31-49e8-8a52-cf05c1c6db2c' })
  @IsString()
  public userId!: string;
}
