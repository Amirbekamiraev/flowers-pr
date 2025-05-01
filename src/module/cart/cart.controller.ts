import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { CartDto } from './dto/cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Get('')
  @UseGuards(JwtAuthGuard)
  getCart(@Request() req) {
    const userId = req.user.id;
    console.log('getCart', userId);

    return this.cartService.getCart(userId);
  }
  @Post('')
  @UseGuards(JwtAuthGuard)
  addToCart(@Body() dto: CartDto, @Request() req) {
    return this.cartService.addToCart(req.user.id, dto.productId, dto.quantity);
  }
}
