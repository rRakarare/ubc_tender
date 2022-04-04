-- DropForeignKey
ALTER TABLE "ContentsOnProjects" DROP CONSTRAINT "ContentsOnProjects_projectId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnProjects" DROP CONSTRAINT "TagsOnProjects_projectId_fkey";

-- AddForeignKey
ALTER TABLE "TagsOnProjects" ADD CONSTRAINT "TagsOnProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentsOnProjects" ADD CONSTRAINT "ContentsOnProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
