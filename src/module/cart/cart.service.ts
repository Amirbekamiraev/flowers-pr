import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from '../database/entities/cart.entity';
import { Repository } from 'typeorm';

export class CartService {
  constructor(
    @InjectRepository(CartEntity) private cartRepo: Repository<CartEntity>,
  ) {}

  async addToCart(userId: number, productId: number, quantity: number) {
    const existing = await this.cartRepo.findOne({
      where: { user: { id: userId }, flower: { id: productId } },
    });

    if (existing) {
      existing.quantity += quantity;
      return this.cartRepo.save(existing);
    }

    const newItem = this.cartRepo.create({
      user: { id: userId },
      flower: { id: productId },
      quantity,
    });
    return this.cartRepo.save(newItem);
  }

  async getCart(userId: number) {
    return this.cartRepo.find({
      where: { user: { id: userId } },
      relations: ['flower'],
    });
  }
}
