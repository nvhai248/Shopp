import { LoginMutation } from "@/+core/definegql";
import { LoginInput } from "@/+core/interfaces";
import { MyGraphqlResponse } from "@/+core/types/response";
import { MyApolloClient } from "@/lib/apolloClient";
import { GraphQLError } from "graphql";

export async function Login(
  email: string,
  password: string,
  isRememberMe: boolean
): Promise<MyGraphqlResponse> {
  const loginInput: LoginInput = {
    email: email,
    password: password,
    isRememberMe: isRememberMe,
  };

  try {
    const { data, errors } = await MyApolloClient.mutate({
      mutation: LoginMutation,
      variables: { loginInput: loginInput },
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
