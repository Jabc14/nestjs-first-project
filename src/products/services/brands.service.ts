import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  findAll() {
    return this.brandRepo.find({
      relations: ['products'],
    });
  }

  async findOne(id: number) {
    const brand = await this.brandRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  create(data: CreateBrandDto) {
    const newBrand = this.brandRepo.create(data);
    return this.brandRepo.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.brandRepo.findOne({ where: { id } });
    this.brandRepo.merge(brand, changes);
    return this.brandRepo.save(brand);
  }

  remove(id: number) {
    return this.brandRepo.delete(id);
  }
}
