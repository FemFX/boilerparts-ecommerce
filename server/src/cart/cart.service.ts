import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    private readonly usersService: UsersService,
    private readonly productService: ProductsService,
  ) {}

  async findAll(userId: number | string): Promise<Cart[]> {
    return this.cartRepository.find({ where: { userId: +userId } });
  }
  async add(addToCartDto: AddToCartDto) {
    const user = await this.usersService.findOne({
      where: { username: addToCartDto.username },
    });
    const part = await this.productService.findOne(addToCartDto.partId);
    console.log(part.images);

    const cart = await this.cartRepository
      .create({
        userId: user.id,
        partId: part.id,
        boiler_manufacturer: part.boiler_manufacturer,
        parts_manufacturer: part.parts_manufacturer,
        price: part.price,
        in_stock: part.in_stock,
        // image: JSON.parse(part.images)[0],
        name: part.name,
        total_price: part.price,
      })
      .save();

    return cart;
  }
  async updateCount(count: number, partId: number): Promise<{ count: number }> {
    const part = await this.cartRepository.findOne({ where: { partId } });
    part.count = count;
    await this.cartRepository.save(part);
    return { count: part.count };
  }
  async updateTotalPrice(
    total_price: number,
    partId: number,
  ): Promise<{ total_price: number }> {
    const part = await this.cartRepository.findOne({ where: { partId } });
    part.total_price = total_price;
    await this.cartRepository.save(part);
    return { total_price: part.total_price };
  }
  async remove(partId: number): Promise<void> {
    await this.cartRepository.delete({ partId });
  }
  async removeAll(userId: number): Promise<void> {
    await this.cartRepository.delete({ userId });
  }
}
