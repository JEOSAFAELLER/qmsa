/*
  Warnings:

  - You are about to drop the column `function` on the `TimeStamp` table. All the data in the column will be lost.
  - Added the required column `userFunction` to the `TimeStamp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TimeStamp` DROP COLUMN `function`,
    ADD COLUMN `userFunction` VARCHAR(191) NOT NULL;
