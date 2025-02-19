import { Prisma } from '@prisma/client';

export class CreateProductDto {
	name: string;
	description: string;
	price: Prisma.Decimal | Prisma.DecimalJsLike | number | string;
	stock: number;
}
