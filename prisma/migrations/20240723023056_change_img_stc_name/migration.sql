/*
  Warnings:

  - You are about to drop the column `imgStc` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `imgStc`,
    ADD COLUMN `imgSrc` VARCHAR(191) NULL;
