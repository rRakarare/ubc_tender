/*
  Warnings:

  - The `isActive` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "IsActive" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isActive",
ADD COLUMN     "isActive" "IsActive" NOT NULL DEFAULT E'INACTIVE';
