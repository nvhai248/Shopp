/*
  Warnings:

  - The values [ALL] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.
  - The values [STORE] on the enum `OwnerType` will be removed. If these variants are still used in the database, this will fail.
  - The values [BUYER,SELLER,SHIPPER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `storeId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `brandId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('MALE', 'FEMALE', 'UNDEFINED');
ALTER TABLE "Product" ALTER COLUMN "gender" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "gender" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TABLE "Product" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "Gender_old";
ALTER TABLE "Product" ALTER COLUMN "gender" SET DEFAULT 'UNDEFINED';
ALTER TABLE "User" ALTER COLUMN "gender" SET DEFAULT 'UNDEFINED';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "OwnerType_new" AS ENUM ('USER', 'BRAND');
ALTER TABLE "Contact" ALTER COLUMN "ownerType" DROP DEFAULT;
ALTER TABLE "Contact" ALTER COLUMN "ownerType" TYPE "OwnerType_new" USING ("ownerType"::text::"OwnerType_new");
ALTER TYPE "OwnerType" RENAME TO "OwnerType_old";
ALTER TYPE "OwnerType_new" RENAME TO "OwnerType";
DROP TYPE "OwnerType_old";
ALTER TABLE "Contact" ALTER COLUMN "ownerType" SET DEFAULT 'USER';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('GUEST', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'GUEST';
COMMIT;

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_storeId_fkey";

-- DropIndex
DROP INDEX "contact_store_idx";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "storeId",
ADD COLUMN     "brandId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "storeId",
ADD COLUMN     "brandId" INTEGER;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "storeId",
ADD COLUMN     "brandId" INTEGER NOT NULL,
ALTER COLUMN "gender" SET DEFAULT 'UNDEFINED';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "googleId" TEXT,
ALTER COLUMN "role" SET DEFAULT 'GUEST',
ALTER COLUMN "gender" SET DEFAULT 'UNDEFINED';

-- DropTable
DROP TABLE "Store";

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "avatar" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "contact_brand_idx" ON "Contact"("brandId");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
