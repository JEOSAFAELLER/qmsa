/*
  Warnings:

  - Added the required column `companyName` to the `TimeStamp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TimeStamp` ADD COLUMN `companyName` VARCHAR(191) NOT NULL;
