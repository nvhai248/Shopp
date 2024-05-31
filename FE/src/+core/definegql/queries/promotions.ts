import { gql } from "@apollo/client";
export const PromotionsQuery = gql`
  query Promotions {
    promotions {
      id
      name
      description
      level
      type
      banner
      discountPercentage
      discountValue
      minValue
      startDate
      endDate
    }
  }
`;
