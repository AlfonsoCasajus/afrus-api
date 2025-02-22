import {
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
	Max,
	Min
} from 'class-validator';

export class BuyersFilters {
	@IsOptional()
	@IsString()
	firstName?: string;

	@IsOptional()
	@IsString()
	lastName?: string;

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
