-- DropForeignKey
ALTER TABLE `TimeStamp` DROP FOREIGN KEY `TimeStamp_activitiesDescription_fkey`;

-- DropForeignKey
ALTER TABLE `TimeStamp` DROP FOREIGN KEY `TimeStamp_clientId_fkey`;

-- AlterTable
ALTER TABLE `TimeStamp` MODIFY `activitiesDescription` VARCHAR(191) NULL,
    MODIFY `clientId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `TimeStamp` ADD CONSTRAINT `TimeStamp_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TimeStamp` ADD CONSTRAINT `TimeStamp_activitiesDescription_fkey` FOREIGN KEY (`activitiesDescription`) REFERENCES `Activities`(`description`) ON DELETE SET NULL ON UPDATE CASCADE;
