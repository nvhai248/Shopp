/*
  Warnings:

  - You are about to drop the column `gender` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Product` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('FICTION', 'NON_FICTION', 'MYSTERY', 'SCIENCE_FICTION', 'FANTASY', 'BIOGRAPHY', 'HISTORY', 'ROMANCE', 'THRILLER', 'CHILDREN', 'YOUNG_ADULT', 'SELF_HELP', 'HEALTH', 'COOKING', 'ART', 'POETRY', 'TRAVEL', 'RELIGION', 'SCIENCE', 'SPORTS');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "gender",
DROP COLUMN "type",
ADD COLUMN     "types" "ProductType"[];
