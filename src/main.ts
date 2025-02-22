import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true, // Esto es importante
			transformOptions: {
				enableImplicitConversion: true
			}
		})
	);

	const config = new DocumentBuilder()
		.setTitle('Afrus Test')
		.setDescription('API desarrollada para el test de Afrus')
		.setVersion('1.0')
		.addTag('afrus')
		.build();

	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, documentFactory);

	app.enableCors({
		origin: process.env.FRONTEND_URL,
		credentials: true
	});

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
