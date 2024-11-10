/*
  Warnings:

  - Added the required column `courseId` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payments` ADD COLUMN `courseId` VARCHAR(191) NOT NULL AFTER `studentId`,
    MODIFY `status` ENUM('Requested', 'Pending', 'Accepted', 'Rejected') NOT NULL DEFAULT 'Requested';

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
