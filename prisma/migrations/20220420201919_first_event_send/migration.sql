/*
  Warnings:

  - You are about to drop the column `type` on the `Event` table. All the data in the column will be lost.
  - Added the required column `typeEvent` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Account_userId_fkey` ON `Account`;

-- DropIndex
DROP INDEX `Session_userId_fkey` ON `Session`;

-- AlterTable
ALTER TABLE `Event` DROP COLUMN `type`,
    ADD COLUMN `typeEvent` VARCHAR(80) NOT NULL,
    MODIFY `date` VARCHAR(191) NOT NULL,
    MODIFY `hour` VARCHAR(191) NOT NULL;
