/*
  Warnings:

  - The `status` column on the `Goal` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "GoalStatus" AS ENUM ('A_FAIRE', 'EN_COURS', 'TERMINE');

-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "status",
ADD COLUMN     "status" "GoalStatus" NOT NULL DEFAULT 'A_FAIRE';
