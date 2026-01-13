import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from 'typeorm';
import { ProductDetail } from './product-detail.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  source_id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  source_url: string;

  // 🔗 Link to product_detail table
  @OneToOne(() => ProductDetail, detail => detail.product)
  detail: ProductDetail;
}
