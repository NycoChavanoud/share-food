/*
  Warnings:

  - A unique constraint covering the columns `[eventId,guestId]` on the table `Invitation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Invitation_eventId_guestId_key` ON `Invitation`(`eventId`, `guestId`);
