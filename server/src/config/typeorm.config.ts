import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cart } from 'src/cart/cart.entity';
import { Product } from 'src/products/products.entity';
import { User } from 'src/users/users.entity';

export const getTypeormConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'mysql',
  port: +configService.get('DB_PORT'),
  host: configService.get<string>('DB_HOST'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASS'),
  database: configService.get<string>('DB_NAME'),
  logging: true,
  synchronize: true,
  entities: [User, Product, Cart],
});
