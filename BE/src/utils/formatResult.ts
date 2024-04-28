import { maskId } from './mask';
import { DB_TYPES } from './const';

export function FormatUser(user: any) {
  try {
    const result = user;
    result.id = maskId(user.id, DB_TYPES.USER);
    return result;
  } catch (error) {
    console.log(error.message);
    return user;
  }
}
