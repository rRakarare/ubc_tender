/*
  Warnings:

  - Added the required column `sectionID` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('muss', 'bewertung', 'optional', 'info');

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "sectionID" INTEGER NOT NULL,
ADD COLUMN     "type" "Type" NOT NULL;

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "layer" INTEGER NOT NULL,
    "rang" INTEGER NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_sectionID_fkey" FOREIGN KEY ("sectionID") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
