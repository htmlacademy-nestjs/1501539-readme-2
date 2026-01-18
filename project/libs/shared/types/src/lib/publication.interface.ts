import { PublicationStatus } from "./publication-status.enum";
import { PublicationType } from "./publication-type.enum";

export interface Publication {
  type: PublicationType;
  authorId: string;
  createdAt: Date;
  publicatedAt: Date;
  status: PublicationStatus;
  likesCount: number;
  commentsCount: number;
  tags?: string[];
  title?: string;
  videoUrl?: string;
  announcement?: string;
  text?: string;
  image?: File;
  quoteAuthor?: string;
  link?: string;
}
