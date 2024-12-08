/*
  Warnings:

  - You are about to drop the column `userId` on the `Activities` table. All the data in the column will be lost.
  - You are about to drop the column `activitiesId` on the `TimeStamp` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `TimeStamp` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TimeStamp` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[description]` on the table `Activities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `Activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activitiesDescription` to the `TimeStamp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientName` to the `TimeStamp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `TimeStamp` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Activities` DROP FOREIGN KEY `Activities_userId_fkey`;

-- DropForeignKey
ALTER TABLE `TimeStamp` DROP FOREIGN KEY `TimeStamp_activitiesId_fkey`;

-- DropForeignKey
ALTER TABLE `TimeStamp` DROP FOREIGN KEY `TimeStamp_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `TimeStamp` DROP FOREIGN KEY `TimeStamp_userId_fkey`;

-- AlterTable
ALTER TABLE `Activities` DROP COLUMN `userId`,
    ADD COLUMN `userEmail` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `TimeStamp` DROP COLUMN `activitiesId`,
    DROP COLUMN `clientId`,
    DROP COLUMN `userId`,
    ADD COLUMN `activitiesDescription` VARCHAR(191) NOT NULL,
    ADD COLUMN `clientName` VARCHAR(191) NOT NULL,
    ADD COLUMN `userEmail` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Activities_description_key` ON `Activities`(`description`);

-- AddForeignKey
ALTER TABLE `TimeStamp` ADD CONSTRAINT `TimeStamp_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TimeStamp` ADD CONSTRAINT `TimeStamp_clientName_fkey` FOREIGN KEY (`clientName`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TimeStamp` ADD CONSTRAINT `TimeStamp_activitiesDescription_fkey` FOREIGN KEY (`activitiesDescription`) REFERENCES `Activities`(`description`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activities` ADD CONSTRAINT `Activities_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
