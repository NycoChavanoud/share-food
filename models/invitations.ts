import db from "../lib/prisma";
import { IEvent } from "./event";
import { IUser } from "./user";

export interface IInvitation {
  id: number;
  guestId: IUser;
  eventId: IEvent;
  status: string;
}

// const eventPropsToShow = {
//   id: true,
//   guestId: true,
//   eventId: true,
//   status: true,
// };

export const getInvitations = async () => {
  return db.invitation.findMany({
    include: {
      event: true,
      guest: true,
    },
  });
};
