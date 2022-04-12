/*
  Warnings:

  - You are about to drop the column `projectTypeId` on the `Project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_projectTypeId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "projectTypeId";

-- CreateTable
CREATE TABLE "ProjectTypesOnContents" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "projectTypeId" INTEGER NOT NULL,

    CONSTRAINT "ProjectTypesOnContents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectTypesOnContents" ADD CONSTRAINT "ProjectTypesOnContents_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTypesOnContents" ADD CONSTRAINT "ProjectTypesOnContents_projectTypeId_fkey" FOREIGN KEY ("projectTypeId") REFERENCES "ProjectType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
