import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class UserRdo {
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
    description: 'User name',
    example: 'John Doe',
  })
  @Expose()
  public name!: string;

  @ApiProperty({
    description: 'User avatar',
    example: 'https://example.com/avatar.png',
  })
  @Expose()
  public avatar!: string;

  @ApiProperty({
    description: 'User created at',
    example: '2026-01-01',
  })
  @Expose()
  public createdAt!: Date;

  @ApiProperty({
    description: 'User followers count',
    example: 123
  })
  @Expose()
  public followersCount!: number;

  @ApiProperty({
    description: 'User publications count',
    example: 123
  })
  @Expose()
  public publicationsCount!: number;
}
