import { RegisterMutation } from "@/+core/definegql";
import { RegisterInput } from "@/+core/interfaces";
import { MyGraphqlResponse } from "@/+core/types/response";
import { MyApolloClient } from "@/lib/apolloClient";
import { GraphQLError } from "graphql";

export async function SignUp(
  email: string,
  password: string
): Promise<MyGraphqlResponse> {
  const registerInput: RegisterInput = {
    email,
    password,
  };

  try {
    const { data, errors } = await MyApolloClient.mutate({
      mutation: RegisterMutation,
      variables: { registerInput: registerInput },
    });

    return {
      data: data || null,
      errors: errors ? [...errors] : null,
    };
  } catch (error) {
    console.error("Something went wrong: ", error);
    return {
      data: null,
      errors: [new GraphQLError("An error occurred during registration.")],
    };
  }
}
