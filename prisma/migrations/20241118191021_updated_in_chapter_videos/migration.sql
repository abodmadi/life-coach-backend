/*
  Warnings:

  - You are about to drop the column `videoUrl` on the `chapters` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `chapters` DROP COLUMN `videoUrl`;

-- CreateTable
CREATE TABLE `chaptersVideos` (
    `id` VARCHAR(191) NOT NULL,
    `chapterId` VARCHAR(191) NOT NULL,
    `videoUrl` MEDIUMTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chaptersVideos` ADD CONSTRAINT `chaptersVideos_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `chapters`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
