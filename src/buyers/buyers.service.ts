import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Buyer } from '@prisma/client';

@Injectable()
export class BuyersService {
	constructor(private prisma: PrismaService) {}

	async create(createBuyerDto: Prisma.BuyerCreateInput): Promise<Buyer> {
		return this.prisma.buyer.create({
			data: createBuyerDto
		});
	}

	async findAll(params: {
		skip?: number;
		limit?: number;
		where?: Prisma.BuyerWhereInput;
		orderBy?: Prisma.BuyerOrderByWithRelationInput;
	}): Promise<{ buyers: Buyer[]; total: number }> {
		const { skip, limit: take, where, orderBy } = params;

		const total = await this.prisma.buyer.count({
			where
		});

		return {
			buyers: await this.prisma.buyer.findMany({
				skip,
				take,
				where,
				orderBy
			}),
			total
		};
	}

	async findOne(where: Prisma.BuyerWhereUniqueInput): Promise<Buyer | null> {
		return this.prisma.buyer.findUnique({
			where
		});
	}

	async update(params: {
		where: Prisma.BuyerWhereUniqueInput;
		data: Prisma.BuyerUpdateInput;
	}): Promise<Buyer> {
		const { where, data } = params;
		return this.prisma.buyer.update({
			data,
			where
		});
	}

	async remove(where: Prisma.BuyerWhereUniqueInput): Promise<Buyer> {
		return this.prisma.buyer.delete({
			where
		});
	}
}
