import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const HistoriesOrderQuery = gql`
  query HistoriesOrder($pagingOrderInput: PagingOrderInput!) {
    historiesOrder(pagingOrderInput: $pagingOrderInput) {
      page
      limit
      total
      data {
        id
        isPaid
        totalPrice
        priceToPay
        reducePrice
        paymentMethod
        status
        createdAt
        updatedAt
        items {
          quantity
          price
          product {
            id
            name
            avatar
            rate
          }
        }
      }
    }
  }
`;
