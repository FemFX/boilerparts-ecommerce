import {
  Controller,
  Get,
  Query,
  UseGuards,
  Param,
  Body,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { faker } from '@faker-js/faker';
import { AuthenticatedGuard } from 'src/auth/auth.guard';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import {
  FindOneResponse,
  GetBestsellersResponse,
  GetByNameRequest,
  GetByNameResponse,
  GetNewResponse,
  PaginateAndFilterResponse,
  SearchRequest,
  SearchResponse,
} from './types';

const boilerManufacturers = [
  'Ariston',
  'Chaffoteaux&Maury',
  'Baxi',
  'Bongioanni',
  'Saunier Duval',
  'Buderus',
  'Strategist',
  'Henry',
  'Northwest',
];
const partsManufacturers = [
  'Azure',
  'Gloves',
  'Cambridgeshire',
  'Salmon',
  'Montana',
  'Sensor',
  'Lesly',
  'Radian',
  'Gasoline',
  'Croatia',
];

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @ApiOkResponse({
    type: PaginateAndFilterResponse,
  })
  @UseGuards(AuthenticatedGuard)
  @Get()
  paginateAndFilter(@Query() query) {
    return this.productsService.paginateAndFilter(query);
  }

  @ApiOkResponse({ type: FindOneResponse })
  @UseGuards(AuthenticatedGuard)
  @Get('find/:id')
  getOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }
  @ApiOkResponse({ type: GetBestsellersResponse })
  @UseGuards(AuthenticatedGuard)
  @Get('bestsellers')
  getBestsellers() {
    return this.productsService.bestsellers();
  }
  @ApiOkResponse({ type: GetNewResponse })
  @UseGuards(AuthenticatedGuard)
  @Get('new')
  getNew() {
    return this.productsService.new();
  }
  @ApiOkResponse({ type: SearchResponse })
  @ApiBody({ type: SearchRequest })
  @UseGuards(AuthenticatedGuard)
  @Post('search')
  search(@Body() { search }: { search: string }) {
    return this.productsService.searchByString(search);
  }
  @ApiOkResponse({ type: GetByNameResponse })
  @ApiBody({ type: GetByNameRequest })
  @UseGuards(AuthenticatedGuard)
  @Post('name')
  getByName(@Body() { name }: { name: string }) {
    return this.productsService.findOneByName(name);
  }

  // @Get()
  // async seed() {
  //   for (let i = 0; i < 100; i++) {
  //     const products = this.productRepository.create({
  //       boiler_manufacturer:
  //         boilerManufacturers[
  //           Math.floor(Math.random() * boilerManufacturers.length)
  //         ],
  //       parts_manufacturer:
  //         partsManufacturers[
  //           Math.floor(Math.random() * partsManufacturers.length)
  //         ],
  //       price: +faker.random.numeric(4),
  //       name: faker.lorem.sentence(2),
  //       description: faker.lorem.sentence(10),
  //       images: JSON.stringify(
  //         [...Array(7)].map(
  //           () =>
  //             `${faker.image.technics()}?random=${+faker.random.numeric(30)}`,
  //         ),
  //       ),
  //       vendor_code: faker.internet.password(),
  //       in_stock: +faker.random.numeric(1),
  //       bestseller: faker.datatype.boolean(),
  //       new: faker.datatype.boolean(),
  //       popularity: +faker.random.numeric(3),
  //       compatibility: faker.lorem.sentence(7),
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     });
  //     await this.productRepository.save(products);
  //   }
  // }
}
