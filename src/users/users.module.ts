import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { CustomerController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';
import { ProductsModule } from '../products/products.module';
import { Customer } from './entities/customer.entity';
import { User } from './entities/user.entity';
import { Order } from './entities/order.entity';
import { OrderProduct } from './entities/order-product.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrderProductService } from './services/order-product.service';
import { OrderProductController } from './controllers/order-product.controller';
// import { Product } from 'src/products/entities/product.entity';

@Module({
  //Insertar en TypeOrmModule.forFeature las entidades que se van a relacionar
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer, Order, OrderProduct]),
  ],
  controllers: [
    CustomerController,
    UsersController,
    OrdersController,
    OrderProductController,
  ],
  providers: [
    CustomersService,
    UsersService,
    OrdersService,
    OrderProductService,
  ],
})
export class UsersModule {}
//
