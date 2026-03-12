-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_weekId_fkey";

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week"("id") ON DELETE CASCADE ON UPDATE CASCADE;
