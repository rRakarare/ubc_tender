/*
  Warnings:

  - You are about to drop the column `layer` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the `_ProjectToTag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[parentSectionId]` on the table `Section` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `textMatrix` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `textShort` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProjectToTag" DROP CONSTRAINT "_ProjectToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToTag" DROP CONSTRAINT "_ProjectToTag_B_fkey";

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "textMatrix" TEXT NOT NULL,
ADD COLUMN     "textShort" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "clientId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "layer",
ADD COLUMN     "parentSectionId" INTEGER;

-- DropTable
DROP TABLE "_ProjectToTag";

-- CreateIndex
CREATE UNIQUE INDEX "Section_parentSectionId_key" ON "Section"("parentSectionId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_parentSectionId_fkey" FOREIGN KEY ("parentSectionId") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;
