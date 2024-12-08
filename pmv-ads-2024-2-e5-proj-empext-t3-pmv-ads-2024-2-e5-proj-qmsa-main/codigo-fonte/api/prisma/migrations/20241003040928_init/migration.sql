/*
  Warnings:

  - You are about to drop the column `userId` on the `Client` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Client` DROP FOREIGN KEY `Client_userId_fkey`;

-- AlterTable
ALTER TABLE `Client` DROP COLUMN `userId`,
    ADD COLUMN `userEmail` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE SET NULL ON UPDATE CASCADE;
