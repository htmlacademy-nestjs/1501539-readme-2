import { BaseMemoryRepository } from "@project/repository";
import { BlogUserEntity } from "./blog-user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BlogUserRepository extends BaseMemoryRepository<BlogUserEntity> {
  public async findByEmail(email: string): Promise<BlogUserEntity | null> {
    const user = Array.from(this.entities.values()).find((entity) => entity.email === email) || null;

    return Promise.resolve(user);
  }
}
