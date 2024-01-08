import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Between, Repository, FindOptionsWhere } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateProductDto, FilterProductsDto } from '../dtos/products.dtos';
import { UpdateProductDto } from '../dtos/products.dtos';
import { Product } from './../entities/product.entity';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll(params: FilterProductsDto) {
    if (params) {
      //where dinámico
      const where: FindOptionsWhere<Product> = {};
      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      return this.productRepo.find({
        where,
        relations: ['brand', 'categories'],
        //take para tomar los elementos que queremos
        take: limit,
        //skip para ignorar los elementos antes de este valor
        skip: offset,
      });
    }
    return this.productRepo.find({
      relations: ['brand', 'categories'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);
    const brand = await this.brandRepo.findOne({
      where: { id: data.brandId },
    });
    if (!brand.id) {
      throw new NotFoundException(`Brand #${brand.id} not found`);
    }
    newProduct.brand = brand;

    if (data.categoriesIds) {
      const categoriesArray = await this.categoryRepo.findBy({
        id: In(data.categoriesIds),
      });
      newProduct.categories = categoriesArray;
    }

    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    if (changes.brandId) {
      const brand = await this.brandRepo.findOne({
        where: { id: changes.brandId },
      });
      if (!brand) {
        throw new NotFoundException(`Brand #${brand.id} not found`);
      }
      product.brand = brand;
    }
    if (changes.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(changes.categoriesIds),
      });
      product.categories = categories;
    }

    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  async removeOneCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );

    return this.productRepo.save(product);
  }

  async addOneCategoryToOneProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException(`Category #${categoryId} not found`);
    }
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
