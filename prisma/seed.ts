import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
//   const tableName = "User"; // Prisma model name is usually PascalCase

//   const result = await prisma.$queryRawUnsafe<any[]>(`
//   SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';
// `);

//   if (result.length > 0) {
//     // Table exists — safe to run further logic
//     const existingUser = await prisma.user.findUnique({
//       where: { email: "admin@example.com" },
//     });

//     if (!existingUser) {
//       await prisma.user.create({
//         data: {
//           email: "admin@example.com",
//           name: "Admin User",
//         },
//       });
//     }
//   } else {
//     console.log(`Table ${tableName} does not exist yet.`);
//   }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
