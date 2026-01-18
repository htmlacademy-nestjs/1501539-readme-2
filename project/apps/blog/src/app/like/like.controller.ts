import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/helpers';
import { LikeRdo } from './rdo/like.rdo';

@ApiTags('like')
@Controller('likes')
export class LikeController {
  constructor(
    private readonly likeService: LikeService
  ) {}

  @ApiResponse({ type: LikeRdo, description: 'like added'})
  @Post(':id')
  public async post(@Body() dto:CreateLikeDto) {
    const like = await this.likeService.post(dto);
    return fillDto(LikeRdo, like.toPOJO());
  }

  @ApiResponse({ type: LikeRdo, description: 'find comment by publicationId and authorId' })
  @Get(':id')
  public async get(@Param('id') id: string, @Query('authorId') authorId: string) {
    const like = await this.likeService.find(id, authorId);
    return fillDto(LikeRdo, like.toPOJO())
  }

  @ApiResponse({ type: LikeRdo, description: 'like deleted' })
  @Delete(':id')
  public async delete(@Param('id') id: string, @Query('authorId') authorId: string) {
    return await this.likeService.delete(id, authorId);
  }
}
