import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { AUTH_USER_EMAIL_NOT_VALID } from "../auth.constant";

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique email',
    example: 'user@example.com',
  })
  @IsEmail({},{message: AUTH_USER_EMAIL_NOT_VALID})
  public email!: string;

  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  @IsString()
  public name!: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  public password!: string;

  @ApiProperty({
    description: 'User avatar',
    example: 'https://example.com/avatar.png',
  })
  @IsString()
  public avatar?: string;
}
