import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductsService {
	constructor(private prisma: PrismaService) {}

	async create(
		createProductDto: Prisma.ProductCreateInput
	): Promise<Product> {
		return this.prisma.product.create({
			data: createProductDto
		});
	}

	async findAll(params: {
		skip?: number;
		limit?: number;
		where?: Prisma.ProductWhereInput;
		orderBy?: Prisma.ProductOrderByWithRelationInput;
	}): Promise<{ products: Product[]; total: number }> {
		const { skip, limit: take, where, orderBy } = params;

		const total = await this.prisma.product.count({
			where
		});

		return {
			products: await this.prisma.product.findMany({
				skip,
				take,
				where,
				orderBy
			}),
			total
		};
	}

	async findOne(
		where: Prisma.ProductWhereUniqueInput
	): Promise<Product | null> {
		return this.prisma.product.findUnique({
			where
		});
	}

	async update(params: {
		where: Prisma.ProductWhereUniqueInput;
		data: Prisma.ProductUpdateInput;
	}): Promise<Product> {
		const { where, data } = params;
		return this.prisma.product.update({
			data,
			where
		});
	}

	async remove(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
		return this.prisma.product.delete({
			where
		});
	}
}
