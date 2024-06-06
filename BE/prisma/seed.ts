import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.hShopAdmin.upsert({
    where: { email: 'admin@hshopp.com' },
    update: {},
    create: {
      email: 'admin@hshopp.com',
      firstName: 'Hai',
      lastName: 'Nguyen',
      gender: 'MALE',
      phoneNumber: '0813042255',
      password: '$2b$10$a9Eaf/fML42Kqro/QNd/FewOm.hDdiu3omJHqsh6xQ2Kzz7FiX8Uu',
      salt: '$2b$10$a9Eaf/fML42Kqro/QNd/Fe',
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
