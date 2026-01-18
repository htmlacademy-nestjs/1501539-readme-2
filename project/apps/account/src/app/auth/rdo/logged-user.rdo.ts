import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class  LoggedUserRdo {
  @ApiProperty({
    description: 'User unique id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: 'User unique email',
    example: 'user@example.com',
  })
  @Expose()
  public email!: string;

  @ApiProperty({
    description: 'User access token',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  public accessToken!: string;
}
