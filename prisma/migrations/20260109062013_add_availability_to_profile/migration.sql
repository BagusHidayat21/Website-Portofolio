/*
  Warnings:

  - You are about to drop the column `aboutImage` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `availability` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `story` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `storyTitle` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "aboutImage",
DROP COLUMN "availability",
DROP COLUMN "story",
DROP COLUMN "storyTitle",
DROP COLUMN "tags",
ADD COLUMN     "isAvailableForWork" BOOLEAN NOT NULL DEFAULT true;
