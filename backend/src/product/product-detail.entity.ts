import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Product, product => product.detail, { onDelete: 'CASCADE' })
  @JoinColumn()
  product: Product;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  author: string;

  @Column({ type: 'text', nullable: true })
  price: string;

  @Column({ type: 'text', nullable: true })
  isbn: string;

  @Column({ type: 'float', nullable: true })
  ratings_avg: number;

  @Column({ type: 'int', nullable: true })
  reviews_count: number;

  @Column({ type: 'timestamp', nullable: true })
  last_scraped_at: Date;
}
