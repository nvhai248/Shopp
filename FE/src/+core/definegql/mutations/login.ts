import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const LoginMutation = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
      expired_accessToken
      data {
        id
        email
        birthDate
        phoneNumber
        gender
        status
        createdAt
        updatedAt
        firstName
        lastName
      }
      refreshToken
      expired_refreshToken
    }
  }
`;
