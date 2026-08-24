import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      { name: "Starter Kit", price: 49, inventory: 12, category: "kits" },
      { name: "Pro Kit", price: 99, inventory: 8, category: "kits" },
      { name: "Growth Pack", price: 149, inventory: 5, category: "packs" }
    ]
  });
}

main().finally(() => prisma.$disconnect());
