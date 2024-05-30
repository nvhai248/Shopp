import { USER_GENDER } from "../enums";

// Define the TypeScript type for the user input
export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  gender?: USER_GENDER;
  birthDate?: string;
  avatar?: string;
}
