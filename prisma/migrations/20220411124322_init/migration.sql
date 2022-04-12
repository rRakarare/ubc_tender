-- CreateEnum
CREATE TYPE "Vartype" AS ENUM ('integer', 'float', 'currency', 'file');

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "var" TEXT,
ADD COLUMN     "vartype" "Vartype";
