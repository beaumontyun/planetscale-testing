const { PrismaClient } = require('@prisma/client');
// import sample data
const { categories, products } = require('./data.js');
// take prisma client and generate new prisma client - to interact with the API of the data
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.category.deleteMany();
    console.log('Deleted records in category table');

    await prisma.product.deleteMany();
    console.log('Deleted records in product table');

    await prisma.$queryRaw`ALTER TABLE Product AUTO_INCREMENT = 1`;
    console.log('reset product auto increment to 1');

    await prisma.$queryRaw`ALTER TABLE Category AUTO_INCREMENT = 1`;
    console.log('reset category auto increment to 1');

    await prisma.category.createMany({
      data: categories,
    });
    console.log('Added category data');

    await prisma.product.createMany({
      data: products,
    });
    console.log('Added product data');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
      // IMPORTANT: ENSURE NO ON-GOING CONNECTION TO THE DATABASE
    await prisma.$disconnect();
  }
};

load();