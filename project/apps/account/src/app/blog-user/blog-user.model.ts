import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthUser } from '@project/types';

@Schema({
  collection: 'accounts',
  timestamps: true,
})
export class BlogUserModel extends Document implements AuthUser {
  @Prop()
  public avatar?: string;

  @Prop({
    required: true,
  })
  public createdAt!: Date;

  @Prop({
    required: true,
    unique: true,
  })
  public email!: string;

  @Prop({
    required: true,
  })
  public name!: string;


  @Prop({
    required: true,
  })
  public passwordHash!: string;

  @Prop({
    required: true
  })
  public followersCount!: number;

  @Prop({
    required: true
  })
  public publicationsCount!: number;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);
