/*
  Warnings:

  - You are about to drop the `Comnsumption` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comnsumption" DROP CONSTRAINT "Comnsumption_foodId_fkey";

-- DropTable
DROP TABLE "Comnsumption";

-- CreateTable
CREATE TABLE "Consumption" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "foodId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Consumption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Consumption" ADD CONSTRAINT "Consumption_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consumption" ADD CONSTRAINT "Consumption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
