import { prisma } from "../src/lib/prisma.js";

async function main(): Promise<void> {
  const who = await prisma.$queryRaw<{ db: string; usr: string }[]>`SELECT current_database() AS db, current_user AS usr`;
  const server = await prisma.$queryRaw<{ version: string }[]>`SELECT version() AS version`;
  console.log("Connected as:", who[0]);
  console.log("Server:", server[0]?.version);
}

main()
  .catch((error: unknown) => {
    console.error("Database check failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
