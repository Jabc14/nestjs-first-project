import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderProductDto } from '../dtos/order-product.dto';
import { Product } from 'src/products/entities/product.entity';
import { Order } from '../entities/order.entity';
import { OrderProduct } from '../entities/order-product.entity';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProduct)
    private orderItemRepo: Repository<OrderProduct>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(data: CreateOrderProductDto) {
    const order = await this.orderRepo.findOne({
      where: { id: data.orderId },
    });
    const product = await this.productRepo.findOne({
      where: { id: data.productId },
    });

    const orderItem = new OrderProduct();

    orderItem.order = order;
    orderItem.product = product;
    orderItem.quantity = data.quantity;

    return this.orderItemRepo.save(orderItem);
  }
}
