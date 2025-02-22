import {
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
	Max,
	Min,
	IsArray
} from 'class-validator';

export interface Product {
	id: number;
	name: string;
	price: number;
	description: string;
}

export interface Transaction {
	id: number;
	paidPrice: number;
	createdAt: string;
	tax: number;
	date: Date;
	product: Product;
}

export class BuyersFilters {
	@IsOptional()
	@IsString()
	firstName?: string;

	@IsOptional()
	@IsString()
	lastName?: string;

	@IsOptional()
	@IsString()
	idType?: string;

	@IsOptional()
	@IsArray()
	transactions?: Transaction[];

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
