// graphql/interfaces.ts
export interface CreateReviewInput {
  productId: string;
  content: string;
  rate: number;
  images: string[];
  title: string;
}
