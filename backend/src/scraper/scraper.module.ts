import { Module, Controller, Post, Query, Param } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScraperService } from './scraper.service';
import { Navigation } from '../navigation/navigation.entity';
import { Product } from '../product/product.entity';
import { ProductDetail } from '../product/product-detail.entity';

@Controller('scrape')
class ScraperController {
  constructor(private readonly service: ScraperService) {}

  //  NAVIGATION
  @Post('navigation')
  scrapeNavigation(@Query('force') force?: string) {
    return this.service.scrapeNavigation(force === 'true');
  }

  //  PRODUCT LIST (FICTION)
  @Post('products/fiction')
  scrapeFictionProducts() {
    return this.service.scrapeFictionProducts();
  }

  //  PRODUCT DETAIL (ON-DEMAND)
  @Post('product/:id')
  scrapeProduct(@Param('id') id: string) {
    return this.service.scrapeProductById(Number(id));
  }
}

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Navigation,
      Product,
      ProductDetail,
    ]),
  ],
  providers: [ScraperService],
  controllers: [ScraperController],
})
export class ScraperModule {}
