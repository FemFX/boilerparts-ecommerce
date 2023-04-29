import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { ILike, Repository } from 'typeorm';
import { IProductsQuery } from './types';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async paginateAndFilter(query: IProductsQuery) {
    const limit = +query.limit;
    const offset = +query.offset * 20;
    console.log(limit, offset);

    const posts = await this.productRepository.find({
      take: limit,
      skip: offset,
    });

    return {
      rows: posts,
      count: posts.length,
    };
  }
  async bestsellers() {
    const posts = await this.productRepository.find({
      where: {
        bestseller: true,
      },
    });
    return {
      rows: posts,
      count: posts.length,
    };
  }
  async new() {
    const posts = await this.productRepository.find({
      where: {
        new: true,
      },
    });
    return {
      rows: posts,
      count: posts.length,
    };
  }
  async findOne(id: number) {
    return await this.productRepository.findOne({
      where: {
        id,
      },
    });
  }
  async findOneByName(name: string) {
    return await this.productRepository.findOne({
      where: {
        name,
      },
    });
  }
  async searchByString(str: string) {
    const posts = await this.productRepository.find({
      where: {
        name: ILike(`%${str}%`),
      },
      take: 20,
    });
    return {
      rows: posts,
      count: posts.length,
    };
  }
}
