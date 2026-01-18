import { Entity } from "@project/repository";
import { AuthUser } from "@project/types";
import { SALT_ROUNDS } from "./blog.user.constant";
import { hash, genSalt, compare } from "bcrypt";

export class BlogUserEntity implements AuthUser, Entity<string> {
   public id?: string;
   public email!: string;
   public name!: string;
   public avatar?: string;
   public passwordHash!: string;
   public createdAt!: Date;
   public followersCount!: number;
   public publicationsCount!: number;

   constructor(user: AuthUser) {
    this.populate(user);
   }

   public populate(data: AuthUser) {
    this.email = data.email;
    this.name = data.name;
    this.avatar = data.avatar;
    this.createdAt = data.createdAt;
    this.followersCount = data.followersCount;
    this.publicationsCount = data.publicationsCount;
   }

   public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      createdAt: this.createdAt,
      followersCount: this.followersCount,
      publicationsCount: this.publicationsCount,
      passwordHash: this.passwordHash,
    };
   }

   public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
   }

   public async comparePassword(password: string): Promise<boolean> {
    return await compare(password, this.passwordHash);
   }
}
