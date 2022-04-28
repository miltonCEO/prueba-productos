import { Exclude, Transform, Type } from 'class-transformer';

import { User } from '../users/schemas/user.schema';
import { UsersSerializer } from '../users/users.serializer';

export class ProductSerializer {
  @Transform((params) => params.obj._id.toString())
  _id: string;

  name: string;
  price: number;

  @Type(() => UsersSerializer)
  owner: User;

  @Exclude()
  __v: number;
}
