import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScraperModule } from './scraper/scraper.module';


import { NavigationModule } from './navigation/navigation.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '08051999',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    NavigationModule,
    CategoryModule, 
    ScraperModule, ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
