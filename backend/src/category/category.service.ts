import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { Navigation } from '../navigation/navigation.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    @InjectRepository(Navigation)
    private readonly navigationRepo: Repository<Navigation>,
  ) {}

  async findAll() {
    return this.categoryRepo.find({
      relations: ['navigation', 'parent', 'children'],
    });
  }

  async create(data: {
    title: string;
    slug: string;
    navigationId: number;
    parentId?: number;
  }) {
    // 🔹 Navigation check
    const navigation = await this.navigationRepo.findOneBy({
      id: data.navigationId,
    });

    if (!navigation) {
      throw new Error('Navigation not found');
    }

    //  Create category
    const category = this.categoryRepo.create({
      title: data.title,
      slug: data.slug,
      navigation: navigation,
    });

    //  Parent category (optional)
    if (data.parentId) {
      const parent = await this.categoryRepo.findOneBy({
        id: data.parentId,
      });

      if (!parent) {
        throw new Error('Parent category not found');
      }

      category.parent = parent;
    }

    return this.categoryRepo.save(category);
  }
}
