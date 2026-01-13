import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Navigation } from '../navigation/navigation.entity';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Navigation])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
