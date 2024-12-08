-- DropForeignKey
ALTER TABLE `TimeStamp` DROP FOREIGN KEY `TimeStamp_companyName_fkey`;

-- AddForeignKey
ALTER TABLE `TimeStamp` ADD CONSTRAINT `TimeStamp_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
