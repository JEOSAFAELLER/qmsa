/*
  Warnings:

  - Changed the type of `hours_worked` on the `TimeStamp` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `TimeStamp` DROP COLUMN `hours_worked`,
    ADD COLUMN `hours_worked` DATETIME(3) NOT NULL;
