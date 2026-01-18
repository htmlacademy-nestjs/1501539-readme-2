import { PublicationType } from "@project/types";
import { PublicationSortRows } from "./publication-sort-rows.enum";

export interface PublicationParams {
    type: PublicationType,
    title: string,
    tags: string[],
    sortBy: PublicationSortRows,
    page: number
  }
