import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillDto } from '@project/helpers';
import { UserRdo } from './rdo/user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiResponse({ type: UserRdo, status: HttpStatus.CREATED, description: 'The user has been successfully created.' })
  @Post('register')
  public async register(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillDto(UserRdo, newUser.toPOJO());
  }

  @ApiResponse({ type: LoggedUserRdo, status: HttpStatus.OK, description: 'The user has been successfully logged in.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const user = await this.authService.verifyUser(dto);
    return fillDto(LoggedUserRdo, user.toPOJO());
  }

  @ApiResponse({ type: UserRdo, status: HttpStatus.OK, description: 'User has been successfully found.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  @Get(':id')
  public async getUser(@Param('id') id: string) {
    const user = await this.authService.getUser(id);
    return fillDto(UserRdo, user.toPOJO());
  }

}
