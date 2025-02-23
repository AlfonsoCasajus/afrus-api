import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Query,
	Patch
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductFilters } from './dto/get-products.dto';
import { Product } from '@prisma/client';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	create(@Body() createProductDto: CreateProductDto): Promise<Product> {
		return this.productsService.create(createProductDto);
	}

	@Get()
	async findAll(
		@Query() filters: ProductFilters
	): Promise<{ products: Product[]; total: number }> {
		const limit = filters.limit ?? 10;
		const page = filters.page ?? 1;

		return await this.productsService.findAll({
			skip: limit * (page - 1),
			limit,
			where: {
				name: {
					contains: filters.name,
					mode: 'insensitive'
				},
				stock: {
					gte: filters.minStock,
					lte: filters.maxStock
				},
				price: {
					gte: filters.minPrice,
					lte: filters.maxPrice
				}
			}
		});
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<Product | null> {
		return this.productsService.findOne({ id });
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateProductDto: UpdateProductDto
	): Promise<Product> {
		return this.productsService.update({
			where: { id },
			data: updateProductDto
		});
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<Product> {
		return this.productsService.remove({ id });
	}
}
