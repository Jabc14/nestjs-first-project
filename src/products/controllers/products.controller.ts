import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ParseIntPipe } from '../../common/parse-int.pipe';
import { ProductsService } from './../services/products.service';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../dtos/products.dtos';
import { Query } from '@nestjs/common/decorators';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of products' })
  getProducts(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params);
  }

  @Get('filter')
  getProductFilter() {
    return `yo soy un filter`;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Put(':productId/categories/:categoryId')
  addOneCategoryToOneProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.addOneCategoryToOneProduct(
      productId,
      categoryId,
    );
  }

  @Delete(':productId/categories/:categoryId')
  deleteOneCategoryFromOneProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.removeOneCategoryByProduct(
      productId,
      categoryId,
    );
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
