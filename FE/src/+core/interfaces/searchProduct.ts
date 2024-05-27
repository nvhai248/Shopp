import { PagingInput } from "./paging.input";

// Define the TypeScript type for the login input
export interface SearchProductInput extends PagingInput {
  keyword?: string;
  categoryId?: string;
  publisherId?: string;
  isOnSale?: boolean;
}
