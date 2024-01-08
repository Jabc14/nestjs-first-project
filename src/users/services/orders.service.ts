import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.orderRepo.find({ relations: ['customer'] });
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    //Se instancia así porque tiene un solo campo y además es obligarotio
    const order = new Order();

    if (data.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: data.customerId },
      });

      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  //Como tiene un solo campo, no tiene que concatenar con otros campos, por eso se guarda directo
  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (changes.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: changes.customerId },
      });
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  remove(id: number) {
    return this.orderRepo.delete(id);
  }
}
