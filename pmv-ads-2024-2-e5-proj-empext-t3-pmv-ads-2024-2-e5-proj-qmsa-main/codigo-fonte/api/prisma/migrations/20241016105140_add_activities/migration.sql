/*
  Warnings:

  - You are about to drop the column `description` on the `TimeStamp` table. All the data in the column will be lost.
  - Added the required column `activitiesId` to the `TimeStamp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endHour` to the `TimeStamp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `function` to the `TimeStamp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initHour` to the `TimeStamp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `local` to the `TimeStamp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observations` to the `TimeStamp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project` to the `TimeStamp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Client` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `TimeStamp` DROP COLUMN `description`,
    ADD COLUMN `activitiesId` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `endHour` DATETIME(3) NOT NULL,
    ADD COLUMN `function` VARCHAR(191) NOT NULL,
    ADD COLUMN `initHour` DATETIME(3) NOT NULL,
    ADD COLUMN `local` VARCHAR(191) NOT NULL,
    ADD COLUMN `observations` VARCHAR(191) NOT NULL,
    ADD COLUMN `project` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Activities` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Activities_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TimeStamp` ADD CONSTRAINT `TimeStamp_activitiesId_fkey` FOREIGN KEY (`activitiesId`) REFERENCES `Activities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activities` ADD CONSTRAINT `Activities_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
