import { Type } from 'class-transformer';
import { User } from '../users/schemas/user.schema';
import { UsersSerializer } from '../users/users.serializer';

export class AuthSerializer {
  @Type(() => UsersSerializer)
  user: User;

  accessToken: string;
}
