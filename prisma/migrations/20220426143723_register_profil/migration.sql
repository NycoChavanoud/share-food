-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_userId_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `birthday` VARCHAR(191) NULL,
    ADD COLUMN `favoritePlate` VARCHAR(191) NULL,
    ADD COLUMN `nickName` VARCHAR(191) NULL;
