import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query
} from '@nestjs/common';
import { BuyersService } from './buyers.service';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';
import { BuyersFilters } from 'src/buyers/dto/get-buyer.dto';
import { CreateBuyerEventDto } from './dto/create-buyer-event.dto';
import { Buyer, BuyerEvent } from '@prisma/client';
@Controller('buyers')
export class BuyersController {
	constructor(private readonly buyersService: BuyersService) {}

	@Post()
	createBuyer(@Body() createBuyerDto: CreateBuyerDto): Promise<Buyer> {
		return this.buyersService.createBuyer(createBuyerDto);
	}
	@Post(':id/event')
	createBuyerEvent(
		@Param('id') id: string,
		@Body() createBuyerEventDto: CreateBuyerEventDto
	): Promise<BuyerEvent> {
		return this.buyersService.createBuyerEvent(id, {
			...createBuyerEventDto
		});
	}

	@Get()
	async findAll(@Query() filters: BuyersFilters): Promise<any> {
		const limit = filters.limit ?? 10;
		const page = filters.page ?? 1;

		return this.buyersService.findAll({
			skip: limit * (page - 1),
			limit,
			where: {
				firstName: {
					contains: filters.firstName,
					mode: 'insensitive'
				},
				lastName: {
					contains: filters.lastName,
					mode: 'insensitive'
				}
			}
		});
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<Buyer | null> {
		return this.buyersService.findOne({ id });
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateBuyerDto: UpdateBuyerDto
	): Promise<Buyer> {
		return this.buyersService.update({
			where: { id },
			data: updateBuyerDto
		});
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<Buyer> {
		return this.buyersService.remove({ id });
	}
}
