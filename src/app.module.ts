import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { BuyersModule } from './buyers/buyers.module';

@Module({
	imports: [ProductsModule, BuyersModule],
	controllers: [],
	providers: []
})
export class AppModule {}
