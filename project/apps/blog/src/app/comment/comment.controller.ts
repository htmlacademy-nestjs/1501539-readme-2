import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { fillDto } from '@project/helpers';
import { CommentRdo } from './rdo/comment.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('comment')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiResponse({type: CommentRdo, description: 'comment create'})
  @Post('create')
  public async create(@Body() dto: CreateCommentDto) {
    const comment = await this.commentService.create(dto);
    return fillDto(CommentRdo, comment.toPOJO());
  }

  @ApiResponse({type: [CommentRdo], description: 'comment create'})
  @Get(':publicationId')
  public async getByPublicationId(@Param('publicationId') publicationId: string, @Query('page') page: string) {
    const comments = await this.commentService.findByPublicationId(publicationId, page);
    return comments.map((comment) => fillDto(CommentRdo, comment.toPOJO()))
  }

  @Delete(':id')
  public async delete(@Param('id') id: string, @Query('authorId') authorId: string) {
    await this.commentService.deleteById(id, authorId)
  }
}
