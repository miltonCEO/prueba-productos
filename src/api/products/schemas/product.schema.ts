import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Transform } from 'class-transformer';

import { User } from '../../users/schemas/user.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Transform((params) => params.obj._id.toString())
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  owner: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
