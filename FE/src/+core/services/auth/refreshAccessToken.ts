import { RefreshATMutation } from "@/+core/definegql";
import { MyGraphqlResponse } from "@/+core/types/response";
import { MyApolloClient } from "@/lib/apolloClient";
import { GraphQLError } from "graphql";

export async function RefreshAccessToken(
  refreshToken: string
): Promise<MyGraphqlResponse> {
  try {
    const { data, errors } = await MyApolloClient.mutate({
      mutation: RefreshATMutation,
      context: {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    });

    return {
      data: data || null,
      errors: errors ? [...errors] : null,
    };
  } catch (error) {
    console.error("Something went wrong: ", error);
    return {
      data: null,
      errors: [
        new GraphQLError("An error occurred during refresh accessToken."),
      ],
    };
  }
}
