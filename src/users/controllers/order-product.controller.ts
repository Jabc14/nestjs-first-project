import { Controller, Post, Body } from '@nestjs/common';

import { CreateOrderProductDto } from '../dtos/order-product.dto';
import { OrderProductService } from '../services/order-product.service';

@Controller('order-product')
export class OrderProductController {
  constructor(private orderProductService: OrderProductService) {}

  @Post()
  create(@Body() payload: CreateOrderProductDto) {
    return this.orderProductService.create(payload);
  }
}
