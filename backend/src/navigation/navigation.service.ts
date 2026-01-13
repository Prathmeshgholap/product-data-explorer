import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Navigation } from './navigation.entity';

@Injectable()
export class NavigationService {
  constructor(
    @InjectRepository(Navigation)
    private readonly repo: Repository<Navigation>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  create(data: { title: string; slug: string }) {
    const nav = this.repo.create(data);
    return this.repo.save(nav);
  }
}
