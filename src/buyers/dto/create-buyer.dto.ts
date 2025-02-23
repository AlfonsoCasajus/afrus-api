import { IsIn, IsString, MinLength } from 'class-validator';

export class CreateBuyerDto {
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
