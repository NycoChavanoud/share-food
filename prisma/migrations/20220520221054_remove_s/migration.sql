/*
  Warnings:

  - You are about to drop the `Invitations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Invitations`;

-- CreateTable
CREATE TABLE `Invitation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guestId` VARCHAR(191) NOT NULL,
    `eventId` INTEGER NULL,
    `status` ENUM('PENDING', 'ACCEPTED', 'REFUSED') NOT NULL,

    INDEX `guest`(`guestId`),
    UNIQUE INDEX `Invitation_eventId_guestId_key`(`eventId`, `guestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
