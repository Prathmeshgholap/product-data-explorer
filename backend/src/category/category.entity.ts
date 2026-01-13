import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Navigation } from '../navigation/navigation.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  // Navigation → Category (Many categories belong to one navigation)
  @ManyToOne(() => Navigation, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'navigation_id' })
  navigation: Navigation;

  // Self relation (parent → children)
  @ManyToOne(() => Category, (cat) => cat.children, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Category;

  @OneToMany(() => Category, (cat) => cat.parent)
  children: Category[];
}
