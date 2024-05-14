import { gql } from "@apollo/client";

export const refreshATMutation = gql`
  mutation RefreshAccessToken {
    refreshAccessToken {
      accessToken
      refreshToken
      expired_accessToken
      expired_refreshToken
    }
  }
`;
