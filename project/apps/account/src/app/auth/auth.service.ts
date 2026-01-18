import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './auth.constant';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly blogUserRepository: BlogUserRepository) {}

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const { email, name, password, avatar } = dto;
    const existingUser = await this.blogUserRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }
    const user = await new BlogUserEntity({ email,
      name,
      avatar,
      createdAt: new Date(),
      followersCount: 0,
      publicationsCount: 0
    }).setPassword(password);

    return await this.blogUserRepository.save(user);
  }

  public async verifyUser(dto: LoginUserDto): Promise<BlogUserEntity> {
    const { email, password } = dto;
    const user = await this.blogUserRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }
    return user;
  }

  public async getUser(id: string): Promise<BlogUserEntity> {
    const user = await this.blogUserRepository.findById(id);
    if (!user) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }
    return user;
  }
}
