/*
  Warnings:

  - You are about to drop the column `endDate` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Experience` table. All the data in the column will be lost.
  - Added the required column `title` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "endDate",
DROP COLUMN "position",
DROP COLUMN "startDate",
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "year" TEXT NOT NULL;
