import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(user: User, createProductDto: CreateProductDto) {
    const productData = { ...createProductDto, owner: user._id };

    const product = new this.productModel(productData);

    return await product.save();
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().populate('owner');

    return products;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).populate('owner');

    return product;
  }

  async update(
    user: User,
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productModel.findById(id);

    if (user._id.toString() !== product.owner.toString()) {
      throw new BadRequestException(`Unauthorized`);
    }

    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      {
        new: true,
      },
    );

    return updatedProduct;
  }

  async remove(user: User, id: string): Promise<Product> {
    const product = await this.productModel.findById(id);

    if (user._id.toString() !== product.owner.toString()) {
      throw new BadRequestException(`Unauthorized`);
    }

    const deletedProduct = await this.productModel.findByIdAndDelete(id);

    return deletedProduct;
  }
}
