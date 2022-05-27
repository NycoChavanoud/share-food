import db from "../lib/prisma";
import { IEvent } from "./event";
import { IUser } from "./user";

export interface IInvitation {
  id: number;
  guestId: string;
  eventId: number;
  status: string;
}

export const getInvitations = async (currentEvent: any) => {
  const currentEventId = currentEvent;
  return db.invitation.findMany({
    include: {
      event: true,
      guest: true,
    },
    where: { eventId: currentEventId },
  });
};
