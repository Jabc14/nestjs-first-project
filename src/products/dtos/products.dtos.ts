import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly brandId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

//DTO para paginación y filtrado
export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsPositive()
  minPrice: number;

  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  maxPrice: number;
}
