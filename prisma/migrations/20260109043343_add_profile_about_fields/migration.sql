/*
  Warnings:

  - You are about to drop the column `about` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `socialLinks` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `githubId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `repoName` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bio` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Project_githubId_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "about",
DROP COLUMN "socialLinks",
ADD COLUMN     "aboutImage" TEXT,
ADD COLUMN     "availability" TEXT NOT NULL DEFAULT 'Available for projects',
ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "instagramUrl" TEXT,
ADD COLUMN     "linkedinUrl" TEXT,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "projectsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "story" TEXT,
ADD COLUMN     "storyTitle" TEXT,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "twitterUrl" TEXT,
ADD COLUMN     "yearsCoding" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "githubId",
DROP COLUMN "repoName",
DROP COLUMN "url",
ADD COLUMN     "content" TEXT,
ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "thumbnail" TEXT,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- CreateTable
CREATE TABLE "TechStack" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "icon" TEXT,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "inMarquee" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TechStack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "location" TEXT,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TechStack_name_key" ON "TechStack"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
