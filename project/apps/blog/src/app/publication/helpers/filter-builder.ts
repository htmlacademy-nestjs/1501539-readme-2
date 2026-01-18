import { PublicationEntity } from "../publication.entity";
import { PublicationFilters } from "../types/publication-filters.interface";

export class FilterBuilder {
  private filters: Array<(entity: PublicationEntity) => boolean> = [];

  public applyFilters(filters: PublicationFilters) {
    if (filters?.type) {
      const type = filters.type;
      this.filters.push((entity) => entity.type === type)
    }

    if (filters?.status) {
      const status = filters.status;
      this.filters.push((entity) => entity.status === status);
    }

    if (filters?.tags?.length) {
      const tags = filters.tags;
      this.filters.push((entity) => tags.every((tag) => entity.tags?.includes(tag)))
    }

    if (filters?.title) {
      const title = filters.title;
      this.filters.push((entity) => !!entity.title?.includes(title));
    }

    return this;
  }

  public build(entities: PublicationEntity[]) {
    if (this.filters.length === 0) {
      return entities;
    }

    return entities.filter((entity) => this.filters.every(fn => fn(entity)));
  }
}
