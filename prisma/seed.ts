import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const initialProducts = [
    { name: "Starter Kit", description: "A practical starter bundle.", price: 49, inventory: 12, category: "kits" },
    { name: "Pro Kit", description: "An expanded professional bundle.", price: 99, inventory: 8, category: "kits" },
    { name: "Growth Pack", description: "Tools for scaling your workflow.", price: 149, inventory: 5, category: "packs" }
  ];

  for (const product of initialProducts) {
    const existing = await prisma.product.findFirst({ where: { name: product.name } });
    if (!existing) await prisma.product.create({ data: product });
  }
}

main()
  .catch((error) => {
    console.error("Database seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
