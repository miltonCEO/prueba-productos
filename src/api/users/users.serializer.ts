import { Exclude, Transform } from 'class-transformer';

export class UsersSerializer {
  @Transform((params) => params.obj._id.toString())
  _id: string;
  fullName: string;
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  __v: number;
}
