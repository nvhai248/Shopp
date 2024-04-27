import { User } from 'src/users/entities/user.entity';
import { unmaskId } from './mask';
import { DB_TYPES } from './const';

export function FormatUser(user: any) {
  try {
    const result = user;
    result.id = unmaskId(user.id, DB_TYPES.USER);
    return result;
  } catch (error) {
    console.log(error.message);
    return user;
  }
}
