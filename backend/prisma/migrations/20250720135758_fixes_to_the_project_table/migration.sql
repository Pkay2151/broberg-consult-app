-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "updatedBy" INTEGER;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
