import { BaseMongoRepository } from "@project/repository";
import { BlogUserEntity } from "./blog-user.entity";
import { Injectable } from "@nestjs/common";
import { BlogUserModel } from "./blog-user.model";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class BlogUserRepository extends BaseMongoRepository<BlogUserEntity, BlogUserModel> {
  constructor(
    @InjectModel(BlogUserModel.name) blogUserModel: Model<BlogUserModel>
  ) {
    super(blogUserModel, BlogUserEntity.fromObject);
  }

  public async findByEmail(email: string): Promise<BlogUserEntity | null> {
    const document = await this.model.findOne({email}).exec();
    const entity = this.createEntityFromDocument(document);
    if (entity && document) {
      entity.id = document._id.toString();
    }
    return entity;
  }
}
