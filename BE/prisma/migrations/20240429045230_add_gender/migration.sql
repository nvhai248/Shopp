-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'ALL');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'ALL';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'ALL',
ADD COLUMN     "phoneNumber" TEXT;
