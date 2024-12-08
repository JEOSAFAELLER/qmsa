/*
  Warnings:

  - You are about to drop the column `clientName` on the `TimeStamp` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `TimeStamp` DROP FOREIGN KEY `TimeStamp_clientName_fkey`;

-- AlterTable
ALTER TABLE `TimeStamp` DROP COLUMN `clientName`;

-- AddForeignKey
ALTER TABLE `TimeStamp` ADD CONSTRAINT `TimeStamp_companyName_fkey` FOREIGN KEY (`companyName`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
