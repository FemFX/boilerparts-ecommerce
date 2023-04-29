import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  boiler_manufacturer: string;
  @Column()
  parts_manufacturer: string;
  @Column()
  vendor_code: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  images: string;
  @Column({ default: 0 })
  in_stock: number;
  @Column({ default: false })
  bestseller: boolean;
  @Column({ default: false })
  new: boolean;
  @Column({ default: 0 })
  price: number;
  @Column()
  popularity: number;
  @Column()
  compatibility: string;
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
