import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductDetail } from './product-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductDetail]), // 🔥 VERY IMPORTANT
  ],
  providers: [ProductService],           // 🔥 MUST BE HERE
  controllers: [ProductController],       // 🔥 MUST BE HERE
  exports: [ProductService],              // (optional but safe)
})
export class ProductModule {}
