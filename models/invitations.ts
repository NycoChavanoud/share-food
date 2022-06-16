import { InvitationStatus } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../lib/prisma";

export interface IInvitation {
  id: number;
  guestId: string;
  eventId: number;
  status: InvitationStatus;
}

const invitPropsToShow = {
  id: true,
  guestId: true,
  eventId: true,
  status: true,
};

export const getInvitations = async (currentEventId: number) => {
  return await db.invitation.findMany({
    include: {
      event: true,
      guest: true,
    },
    where: { eventId: currentEventId },
  });
};

export const getOneInvite = (id: number) => {
  return db.invitation.findUnique({
    where: { id },

    include: {
      event: true,
      guest: true,
    },
  });
};

export const deleteInvitationbyEventId = async (id: number) => {
  return await db.invitation.delete({
    where: {
      id,
    },
  });
};

export const createOneGuestForEvent = async ({
  guestId,
  eventId,
  status,
}: IInvitation) => {
  return await db.invitation.create({
    data: {
      guestId,
      eventId,
      status,
    },
  });
};
