import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Post()
  create(
    @Body()
    body: {
      title: string;
      slug: string;
      navigationId: number;
      parentId?: number;
    },
  ) {
    return this.service.create(body);
  }
}
