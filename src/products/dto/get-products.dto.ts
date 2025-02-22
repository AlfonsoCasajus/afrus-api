import {
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
	Max,
	Min
} from 'class-validator';

export class ProductFilters {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsNumber()
	@IsPositive()
	@Min(0)
	minPrice?: number;

	@IsOptional()
	@IsNumber()
	@IsPositive()
	@Min(0)
	maxPrice?: number;

	@IsOptional()
	@IsNumber()
	@IsPositive()
	@Min(0)
	minStock?: number;

	@IsOptional()
	@IsNumber()
	@IsPositive()
	@Min(0)
	maxStock?: number;

	@IsOptional()
	@IsNumber()
	@IsPositive()
	@Min(1)
	page?: number;

	@IsOptional()
	@IsNumber()
	@IsPositive()
	@Min(1)
	@Max(100)
	limit?: number;
}
