import { Min } from 'class-validator';
import { IsNumber } from 'class-validator';
import { IsString, MinLength } from 'class-validator';

export class UpdateProductDto {
	@IsString()
	@MinLength(3)
	name: string;

	@IsString()
	@MinLength(3)
	description: string;

	@IsNumber()
	@Min(0)
	price: number;

	@IsNumber()
	@Min(0)
	stock: number;
}
