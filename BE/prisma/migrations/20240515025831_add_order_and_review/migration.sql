/*
  Warnings:

  - The values [GUEST] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `brandId` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `ownerType` on the `Contact` table. All the data in the column will be lost.
  - Added the required column `priceSale` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('CUSTOMER', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'CUSTOMER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_brandId_fkey";

-- DropIndex
DROP INDEX "contact_brand_idx";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "brandId",
DROP COLUMN "ownerType";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "reviewInt" INTEGER;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "priceSale" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'CUSTOMER';

-- DropEnum
DROP TYPE "OwnerType";

-- CreateTable
CREATE TABLE "productOrder" (
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "productOrder_pkey" PRIMARY KEY ("orderId","productId")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contactId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "int" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("int")
);

-- CreateIndex
CREATE INDEX "brand_category_index" ON "Category"("brandId");

-- CreateIndex
CREATE INDEX "brand_product_index" ON "Product"("brandId");

-- CreateIndex
CREATE INDEX "category_product_index" ON "Product"("categoryId");

-- CreateIndex
CREATE INDEX "userId_index" ON "RefreshToken"("userId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_reviewInt_fkey" FOREIGN KEY ("reviewInt") REFERENCES "Review"("int") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productOrder" ADD CONSTRAINT "productOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productOrder" ADD CONSTRAINT "productOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
