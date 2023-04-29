import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthenticatedGuard } from 'src/auth/auth.guard';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import {
  AddToCardResponse,
  GetAllResponse,
  TotalPriceRequest,
  TotalPriceResponse,
  UpdateCountRequest,
  UpdateCountResponse,
} from './types';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @ApiOkResponse({ type: GetAllResponse })
  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  getAll(@Param('id') userId: string) {
    return this.cartService.findAll(+userId);
  }
  @ApiOkResponse({ type: AddToCardResponse })
  @UseGuards(AuthenticatedGuard)
  @Post('add')
  addToCart(@Body() addToCartDto: AddToCartDto) {
    return this.cartService.add(addToCartDto);
  }
  @ApiOkResponse({ type: UpdateCountResponse })
  @ApiBody({ type: UpdateCountRequest })
  @UseGuards(AuthenticatedGuard)
  @Patch('count/:id')
  updateCount(
    @Param('id') partId: string,
    @Body() { count }: { count: number },
  ) {
    return this.cartService.updateCount(count, +partId);
  }
  @ApiOkResponse({ type: TotalPriceResponse })
  @ApiBody({ type: TotalPriceRequest })
  @UseGuards(AuthenticatedGuard)
  @Patch('total_price/:id')
  updateTotalPrice(
    @Param('id') partId: string,
    @Body() { total_price }: { total_price: number },
  ) {
    return this.cartService.updateTotalPrice(total_price, +partId);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('one/:id')
  removeOne(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
  @UseGuards(AuthenticatedGuard)
  @Delete('all/:id')
  removeAll(@Param('id') id: string) {
    return this.cartService.removeAll(+id);
  }
}
