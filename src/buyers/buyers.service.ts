import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Buyer, BuyerEvent } from '@prisma/client';
import { CreateBuyerEventDto } from './dto/create-buyer-event.dto';

@Injectable()
export class BuyersService {
	constructor(private prisma: PrismaService) {}

	async createBuyer(createBuyerDto: Prisma.BuyerCreateInput): Promise<Buyer> {
		return this.prisma.buyer.create({
			data: createBuyerDto
		});
	}
	async createBuyerEvent(
		buyerId: string,
		createBuyerEventDto: CreateBuyerEventDto
	): Promise<BuyerEvent> {
		return this.prisma.buyerEvent.create({
			data: {
				buyer: {
					connect: {
						id: buyerId
					}
				},
				...createBuyerEventDto
			}
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
				orderBy,
				include: {
					transactions: {
						include: {
							product: true
						}
					}
				}
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
