/*
  Warnings:

  - You are about to drop the column `author` on the `Event` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Event` DROP COLUMN `author`,
    ADD COLUMN `authorId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `author` ON `Event`(`authorId`);
