import { PublicationStatus, PublicationType } from "@project/types";

export interface PublicationFilters {
  tags?: string[],
  status?: PublicationStatus,
  type?: PublicationType,
  title?: string
}
