import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  boiler_manufacturer: string;
  @Column()
  parts_manufacturer: string;
  @Column()
  name: string;
  //   @Column()
  //   image: string;
  @Column({ default: 0 })
  in_stock: number;
  @Column({ default: 0 })
  price: number;
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
  @Column({ default: 0 })
  count: number;
  @Column({ default: 0 })
  total_price: number;
  @Column()
  userId: number;
  @Column({ default: 0 })
  partId: number;
}
