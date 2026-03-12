/*
  Warnings:

  - A unique constraint covering the columns `[startDate]` on the table `Week` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `startDate` to the `Week` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Week" ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Week_startDate_key" ON "Week"("startDate");
