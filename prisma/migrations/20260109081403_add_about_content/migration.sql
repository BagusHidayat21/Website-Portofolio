-- CreateTable
CREATE TABLE "AboutContent" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "heroTitle" TEXT NOT NULL DEFAULT 'ENGINEERING',
    "heroSubtitle" TEXT NOT NULL DEFAULT 'EXCELLENCE',
    "heroDescription" TEXT NOT NULL,
    "storyTitle" TEXT,
    "storyContent" TEXT,
    "mainImage" TEXT,
    "secondaryImage" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutContent_pkey" PRIMARY KEY ("id")
);
