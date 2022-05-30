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

export const getInvitations = async (currentEvent: any) => {
  const currentEventId = currentEvent;
  return await db.invitation.findMany({
    include: {
      event: true,
      guest: true,
    },
    where: { eventId: parseInt(currentEventId, 10) },
  });
};

export const deleteInvitationbyEventId = async (id: any) => {
  return await db.invitation.delete({
    where: {
      id: parseInt(id, 10),
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
