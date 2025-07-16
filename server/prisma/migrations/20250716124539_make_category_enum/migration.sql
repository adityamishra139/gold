/*
  Warnings:

  - Changed the type of `category` on the `GoldItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ring', 'necklace', 'bracelet', 'earring', 'pendant', 'chain');

-- AlterTable
ALTER TABLE "GoldItem" DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL;
