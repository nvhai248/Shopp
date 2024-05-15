/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_productId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_reviewInt_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "cover" TEXT[];

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "cover" TEXT[];

-- DropTable
DROP TABLE "Image";
