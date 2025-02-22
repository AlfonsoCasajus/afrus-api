import { EventType } from '@prisma/client';

export class CreateBuyerEventDto {
	type: EventType;
	date: Date;
}
