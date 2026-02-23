import { PublicationStatus } from "./publication-status.enum";
import { PublicationType } from "./publication-type.enum";

export interface Publication {
  id?: string;
  type: PublicationType;
  authorId: string;
  createdAt: Date;
  publicatedAt: Date | null;
  status: PublicationStatus;
  likesCount: number;
  commentsCount: number;
  tags: string[];
  title: string | null;
  videoUrl: string | null;
  announcement: string | null;
  text: string | null;
  image: string | null;
  quoteAuthor: string | null;
  link: string | null;
}
