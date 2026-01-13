import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async saveMany(items: Partial<Product>[]) {
    for (const item of items) {
      if (!item.source_id) continue;

      const exists = await this.productRepo.findOneBy({
        source_id: item.source_id,
      });

      if (!exists) {
        const product = this.productRepo.create(item);
        await this.productRepo.save(product);
      }
    }

    return this.findAll();
  }

  // 👇 THIS IS THE IMPORTANT FIX
  findAll() {
  return this.productRepo.find({
    relations: ['detail'],
  });
}
}
