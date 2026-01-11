/*
  Warnings:

  - You are about to drop the column `mainImage` on the `AboutContent` table. All the data in the column will be lost.
  - You are about to drop the column `secondaryImage` on the `AboutContent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AboutContent" DROP COLUMN "mainImage",
DROP COLUMN "secondaryImage",
ADD COLUMN     "images" TEXT[];
