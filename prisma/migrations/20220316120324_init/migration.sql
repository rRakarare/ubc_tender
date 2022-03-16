/*
  Warnings:

  - You are about to drop the column `sectionID` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the `_ContentToProject` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sectionId` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_sectionID_fkey";

-- DropForeignKey
ALTER TABLE "_ContentToProject" DROP CONSTRAINT "_ContentToProject_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContentToProject" DROP CONSTRAINT "_ContentToProject_B_fkey";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "sectionID",
ADD COLUMN     "sectionId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ContentToProject";

-- CreateTable
CREATE TABLE "ContentsOnProjects" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "contentd" INTEGER NOT NULL,

    CONSTRAINT "ContentsOnProjects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentsOnProjects" ADD CONSTRAINT "ContentsOnProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentsOnProjects" ADD CONSTRAINT "ContentsOnProjects_contentd_fkey" FOREIGN KEY ("contentd") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
