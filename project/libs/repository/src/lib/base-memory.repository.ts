import { randomUUID } from "node:crypto";
import { DefaultPojoType, Entity, EntityIdType } from "./entity.interface";
import { Repository } from "./repository.interface";

export class BaseMemoryRepository<EntityType extends Entity<EntityIdType, PojoType>, PojoType = DefaultPojoType> implements Repository<EntityType, PojoType> {
  protected readonly entities: Map<EntityType['id'], EntityType> = new Map();

  public async findById(id: EntityType['id']): Promise<EntityType | null> {
    const entity = this.entities.get(id);
    return Promise.resolve(entity || null);
  }

  public async save(entity: EntityType): Promise<EntityType> {
    if (!entity.id) {
      entity.id = randomUUID();
    }
    this.entities.set(entity.id, entity);
    return entity;
  }

  public async update(id: EntityType['id'], entity: EntityType): Promise<EntityType> {
    if (!this.entities.has(id)) {
      throw new Error(`Entity with id ${id} does not exist`);
    }
    this.entities.set(id, entity);
    return entity;
  }

  public async delete(id: EntityType['id']): Promise<void> {
    this.entities.delete(id);
  }
}
