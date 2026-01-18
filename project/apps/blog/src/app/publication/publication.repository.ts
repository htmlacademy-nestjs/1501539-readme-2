import { BaseMemoryRepository } from "@project/repository";
import { PublicationEntity } from "./publication.entity";
import { Injectable } from "@nestjs/common";
import { SortDirection, sort as sortFunc } from '@project/helpers';
import { PublicationFilters } from "./types/publication-filters.interface";
import { PublicationSortRows } from "./types/publication-sort-rows.enum";
import { FilterBuilder } from "./helpers/filter-builder";

@Injectable()
export class PublicationRepository extends BaseMemoryRepository<PublicationEntity> {
  public async findAll(
    filters: PublicationFilters,
    sort: {sortBy: PublicationSortRows, sortDirection: SortDirection },
    pagination: {limit: number, page: number},
  ) {
    const entitiesArray = this.entitiesArray;
    const {limit, page} = pagination;
    const sortedEntities = sortFunc<PublicationEntity>(
      entitiesArray,
      (entity) => {
          switch (sort.sortBy) {
            case PublicationSortRows.PUBLICATED_AT:
              return entity.publicatedAt;
            case PublicationSortRows.LIKES_COUNT:
              return entity.likesCount;
            case PublicationSortRows.COMMENTS_COUNT:
              return entity.commentsCount;
          }
      },
      sort.sortDirection);
    const filteredEntities = new FilterBuilder().applyFilters({...filters}).build(sortedEntities);
    const pageEntities = filteredEntities.slice(page*limit, (page+1)*limit);
    return pageEntities;
  }

  public async findByAuthorId(authorId: string, pagination: {limit: number, page: number}) {
    const entitiesArray = this.entitiesArray;
    const {limit, page} = pagination;
    return entitiesArray.filter((entity) => entity.authorId === authorId).slice(page*limit, (page+1)*limit);
  }

  get entitiesArray() {
    return Array.from(this.entities.values());
  }

}
