/*
  Warnings:

  - You are about to drop the column `Comments` on the `Week` table. All the data in the column will be lost.
  - Added the required column `comments` to the `Week` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Week" DROP COLUMN "Comments",
ADD COLUMN     "comments" TEXT NOT NULL;
