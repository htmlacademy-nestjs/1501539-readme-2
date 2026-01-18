import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { ApiExtraModels, ApiParam, ApiQuery, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { VideoPublicationRdo } from './rdo/video-publication.rdo';
import { TextPublicationRdo } from './rdo/text-publication.rdo';
import { ImagePublicationRdo } from './rdo/image-publication.rdo';
import { QuotePublicationRdo } from './rdo/quote-publication.rdo';
import { LinkPublicationRdo } from './rdo/link-publication.rdo';
import type { PublicationParams } from './types/publication-params.interface';
import { fillDtoByType } from './helpers/fill-dto-by-type';
import { PublicationType } from '@project/types';
import { PublicationSortRows } from './types/publication-sort-rows.enum';
import { EXAMPLE_PUBLICATION } from './publication.constant';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@ApiTags('publication')
@Controller('publications')
export class PublicationController {
  constructor(
    private readonly publicationService: PublicationService
  ) {}

  @ApiExtraModels(VideoPublicationRdo, TextPublicationRdo, ImagePublicationRdo, QuotePublicationRdo, LinkPublicationRdo)
  @ApiResponse({
    status: HttpStatus.CREATED,
    schema: {
      oneOf: [
        { $ref: getSchemaPath(VideoPublicationRdo) },
        { $ref: getSchemaPath(TextPublicationRdo) },
        { $ref: getSchemaPath(QuotePublicationRdo) },
        { $ref: getSchemaPath(ImagePublicationRdo) },
        { $ref: getSchemaPath(LinkPublicationRdo) },
      ]
    },
    description: 'Publication created'
  })
  @Post('create')
  public async create(@Body() dto: CreatePublicationDto) {
    const publication = await this.publicationService.create(dto);
    return fillDtoByType(publication);
  }

  @ApiResponse({status: HttpStatus.OK, description: 'publication list', example: [EXAMPLE_PUBLICATION] })
  @ApiQuery({ name: 'type', required: false, enum: PublicationType, example: PublicationType.TEXT, description: 'filter by type' })
  @ApiQuery({ name: 'title', required: false, type: String, example: 'My', description: 'filter by title' })
  @ApiQuery({ name: 'tags', required: false, type: Array, example: 'exampleTag,exampleTag1', description: 'filter by tags' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: '0', description: 'page number' })
  @ApiQuery({ name: 'sortBy', required: false, enum: PublicationSortRows, example: PublicationSortRows.PUBLICATED_AT, description: 'publication sort field' })
  @Get('/')
  public async index(@Query() params: PublicationParams) {
    const publications = await this.publicationService.findAll(params);
    return publications.map((publication) => fillDtoByType(publication));
  }

  @ApiResponse({status: HttpStatus.OK, description: 'publication details', example: EXAMPLE_PUBLICATION })
  @ApiParam({ name: 'id', description: 'publication id', example: '14320425-9270-4b8d-ab1d-50769f899847' })
  @Get(':id')
  public async getPublicationById(@Param('id') id: string) {
    const publication = await this.publicationService.findById(id);
    if (!publication) {
      throw new NotFoundException(`Publication with id: ${id} not found`);
    }
    return fillDtoByType(publication);
  }

  @ApiResponse({status: HttpStatus.OK, description: 'publication update', example: EXAMPLE_PUBLICATION })
  @ApiParam({ name: 'id', description: 'publication id', example: '14320425-9270-4b8d-ab1d-50769f899847' })
  @Patch(':id')
  public async updatePublicationById(@Param('id') id: string, @Body() dto: UpdatePublicationDto) {
    const publication = await this.publicationService.updateById(id, dto);
    return fillDtoByType(publication);
  }

  @ApiResponse({status: HttpStatus.OK, description: 'publication delete' })
  @ApiParam({ name: 'id', description: 'publication id', example: '14320425-9270-4b8d-ab1d-50769f899847' })
  @Delete(':id')
  public async deletePublicationById(@Param('id') id: string) {
    return await this.publicationService.deleteById(id);
  }

  @ApiResponse({status: HttpStatus.OK, description: 'author publications', example: [EXAMPLE_PUBLICATION] })
  @ApiParam({ name: 'id', description: 'author id', example: '14320425-9270-4b8d-ab1d-50769f899847' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: '0', description: 'page number' })
  @Post('author/:id')
  public async getAuthorPublications(@Param('id') id: string, @Query('page') page: string) {
    const authorPublications = await this.publicationService.findByAuthorId(id, page)
    return authorPublications.map((publication) => fillDtoByType(publication));
  }
}
