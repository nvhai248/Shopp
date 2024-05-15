/*
  Warnings:

  - You are about to drop the column `sale` on the `Product` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StatusOrder" AS ENUM ('PENDING', 'ON_SHPPING', 'CANCEL', 'DONE');

-- CreateEnum
CREATE TYPE "StatusProduct" AS ENUM ('ACTIVED', 'DELETED', 'ON_SALE', 'ON_PROMOTION');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "StatusOrder" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sale",
ADD COLUMN     "status" "StatusProduct" NOT NULL DEFAULT 'ACTIVED';

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX "owner_order_index" ON "Order"("ownerId");

-- CreateIndex
CREATE INDEX "owner_review_index" ON "Review"("ownerId");

-- CreateIndex
CREATE INDEX "product_review_index" ON "Review"("productId");
