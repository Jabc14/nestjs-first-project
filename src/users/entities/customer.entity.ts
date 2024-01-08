import { User } from './user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'lastname', type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'varchar', unique: true })
  phone: string;

  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  //Genera la fecha de creación automáticamente
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  //Actualiza la fecha automáticamente
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
