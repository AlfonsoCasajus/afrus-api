import { MinLength } from 'class-validator';
import { IsString } from 'class-validator';
import { IsIn } from 'class-validator';

export class UpdateBuyerDto {
	@IsString()
	@MinLength(3)
	firstName: string;

	@IsString()
	@MinLength(3)
	lastName: string;

	@IsString()
	@IsIn(['DNI', 'Passport', 'Driver License'])
	idType: 'DNI' | 'Passport' | 'Driver License';
}
