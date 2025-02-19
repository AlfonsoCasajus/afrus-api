import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const seedDatabase = async () => {
	try {
		console.log('🌱 Seeding database...');

		// Generate Products (500 records)
		const products = Array.from({ length: 500 }).map(() => ({
			id: faker.string.uuid(),
			name: faker.commerce.productName(),
			description: faker.commerce.productDescription(),
			price: parseFloat(faker.commerce.price({ min: 5, max: 500 })),
			stock: faker.number.int({ min: 0, max: 100 })
		}));

		await prisma.product.createMany({ data: products });
		console.log('✅ Products inserted');

		// Generate Buyers (2000 records)
		const buyers = Array.from({ length: 2000 }).map(() => ({
			id: faker.string.uuid(),
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			idType: faker.helpers.arrayElement([
				'DNI',
				'Passport',
				'Driver License'
			]),
			createdAt: faker.date.past()
		}));

		await prisma.buyer.createMany({ data: buyers });
		console.log('✅ Buyers inserted');

		// Get all buyer and product IDs
		const buyerIds = buyers.map((buyer) => buyer.id);
		const productIds = products.map((product) => product.id);

		// Generate Transactions (8000 records)
		const transactions = Array.from({ length: 8000 }).map(() => {
			const productId = faker.helpers.arrayElement(productIds);
			const buyerId = faker.helpers.arrayElement(buyerIds);
			const price = products.find((p) => p.id === productId)?.price ?? 0;
			const tax = price * 0.18; // Example 18% tax

			return {
				id: faker.string.uuid(),
				buyerId,
				productId,
				paidPrice: price,
				tax,
				date: faker.date.recent({ days: 365 })
			};
		});

		await prisma.transaction.createMany({ data: transactions });
		console.log('✅ Transactions inserted');

		// Generate Buyer Events (at least 1 per buyer)
		const events = buyerIds.flatMap((buyerId) => {
			const eventCount = faker.number.int({ min: 1, max: 5 }); // Each buyer has 1-5 events
			return Array.from({ length: eventCount }).map(() => ({
				id: faker.string.uuid(),
				buyerId,
				type: faker.helpers.arrayElement([
					'PURCHASE',
					'RETURN',
					'VISIT',
					'DATA_QUERY',
					'DATA_UPDATE',
					'INVOICE_DOWNLOAD'
				]),
				date: faker.date.recent({ days: 365 })
			}));
		});

		await prisma.buyerEvent.createMany({ data: events });
		console.log('✅ Buyer Events inserted');

		console.log('🎉 Seeding completed successfully!');
	} catch (error) {
		console.error('❌ Error seeding database:', error);
	} finally {
		await prisma.$disconnect();
	}
};

// Run the seed function
seedDatabase();
