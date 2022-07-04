import { InvitationStatus } from "@prisma/client";
import db from "../lib/prisma";
import { IEvent } from "./event";
import { IUser } from "./user";

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

export const getInvitations = async (currentEventId: string) => {
  return await db.invitation
    .findMany({
      include: {
        event: true,
        guest: true,
      },
      where: { eventId: parseInt(currentEventId, 10) },
    })
    .catch((_) => false);
};

export const getInvitationsByUserId = async (currentUserId: String) => {
  const dateOfDay = new Date().toISOString().substring(0, 10);
  return await db.invitation.findMany({
    where: {
      guestId: currentUserId.toString(),
      event: {
        date: {
          gte: dateOfDay,
        },
      },
    },
    include: {
      event: true,
      guest: true,
    },
  });
};
export const getOneInvite = async (id: string) => {
  return await db.invitation.findUnique({
    where: { id: parseInt(id, 10) },

    include: {
      event: true,
      guest: true,
    },
  });
};

export const deleteInvitationbyEventId = async (id: string) => {
  return await db.invitation
    .delete({
      where: {
        id: parseInt(id, 10),
      },
      include: {
        event: true,
        guest: true,
      },
    })
    .catch((_) => false);
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
    include: {
      event: true,
      guest: true,
    },
  });
};
