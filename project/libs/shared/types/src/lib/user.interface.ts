export interface User {
   email: string;
   name: string;
   avatar?: string;
   createdAt: Date;
   followersCount: number;
   publicationsCount: number;
}
