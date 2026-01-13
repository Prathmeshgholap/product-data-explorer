import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Navigation } from '../navigation/navigation.entity';
import { Product } from '../product/product.entity';
import { ProductDetail } from '../product/product-detail.entity';

import { scrapeWorldOfBooksNavigation } from './worldofbooks.navigation';
import { scrapeFictionProducts } from './worldofbooks.products';
import { scrapeProductDetail } from './worldofbooks.product-detail';

@Injectable()
export class ScraperService {
  constructor(
    @InjectRepository(Navigation)
    private readonly navRepo: Repository<Navigation>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(ProductDetail)
    private readonly detailRepo: Repository<ProductDetail>,
  ) {}

  // -------------------------
  // 1️⃣ SCRAPE NAVIGATION
  // -------------------------
  async scrapeNavigation(force = false) {
    const existing = await this.navRepo.find();

    if (existing.length && !force) {
      return { cached: true, data: existing };
    }

    const items = await scrapeWorldOfBooksNavigation();

    for (const item of items) {
      const exists = await this.navRepo.findOne({
        where: { slug: item.slug },
      });

      if (!exists) {
        await this.navRepo.save(
          this.navRepo.create({
            title: item.title,
            slug: item.slug,
          }),
        );
      }
    }

    return { cached: false, data: await this.navRepo.find() };
  }

  // -------------------------
  // 2️⃣ SCRAPE FICTION PRODUCTS (LIST PAGE)
  // -------------------------
  async scrapeFictionProducts() {
    const items = await scrapeFictionProducts();

    const rows = items
      .filter(i => i.source_id && i.title && i.source_url)
      .map(i => ({
        source_id: i.source_id,
        title: i.title,
        source_url: i.source_url,
      }));

    // bulk insert + ignore duplicates
    await this.productRepo
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values(rows as any)
      .orIgnore()
      .execute();

    return this.productRepo.find({
      order: { id: 'DESC' },
    });
  }

  // -------------------------
  // 3️⃣ SCRAPE SINGLE PRODUCT DETAIL
  // -------------------------
  async scrapeProductById(productId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const existing = await this.detailRepo.findOne({
      where: { product: { id: productId } },
      relations: ['product'],
    });

    // use cached detail if already scraped
    if (existing && existing.last_scraped_at) {
      return { cached: true, data: existing };
    }

    // scrape product page
    const data = await scrapeProductDetail(product.source_url);

    const detail =
      existing ??
      this.detailRepo.create({
        product,
      });

    Object.assign(detail, {
      description: data.description,
      author: data.author,
      price: data.price,
      isbn: data.isbn,
      ratings_avg: data.ratings_avg,
      reviews_count: data.reviews_count,
      last_scraped_at: new Date(),
    });

    await this.detailRepo.save(detail);

    return { cached: false, data: detail };
  }
}
