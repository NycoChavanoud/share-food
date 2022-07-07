import db from "../lib/prisma";
import Joi from "joi";
import { IUser } from "./user";

import { IInvitation } from "./invitations";

export interface IEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  hour: string;
  typeEvent: string;
  address: string;
  diff?: number;
  authorId: string;
  author: IUser;
  guestId: string;
  status: string;
  invitations: IInvitation[];
}

const eventPropsToShow = {
  title: true,
  id: true,
  description: true,
  date: true,
  hour: true,
  typeEvent: true,
  address: true,
  authorId: true,
};

export const createEvent = async ({
  title,
  description,
  date,
  hour,
  typeEvent,
  address,
  authorId,
  invitations,
}: Omit<IEvent, "id" | "author" | " ">) => {
  return await db.event
    .create({
      data: {
        invitations: {
          create: invitations,
        },
        title,
        date,
        hour,
        description,
        typeEvent,
        address,
        authorId,
      },
    })
    .catch((_) => false);
};

export const getEvents = async (currentUser: IUser) => {
  const dateOfDay = new Date().toISOString().substring(0, 10);
  const currentUserId = currentUser.id;
  return db.event
    .findMany({
      select: eventPropsToShow,
      orderBy: {
        date: "asc",
      },
      where: {
        date: {
          gte: dateOfDay,
        },
        OR: [
          {
            authorId: currentUserId,
          },
          {
            invitations: {
              some: {
                guestId: currentUserId,
                status: "ACCEPTED",
              },
            },
          },
        ],
      },
    })
    .catch((_) => false);
};

export const getOneEvent = (id: string) => {
  return db.event.findUnique({
    where: { id: parseInt(id, 10) },

    include: {
      author: true,
      invitations: true,
    },
  });
};

export const deleteOneEvent = (id: string) => {
  return db.event
    .delete({
      where: { id: parseInt(id, 10) },
    })
    .catch((_) => false);
};

export const deleteManyEvents = db.event.deleteMany;

export const validateEvent = (data: any, forUpdate = false) => {
  const presence = forUpdate ? "optional" : "required";
  return Joi.object({
    title: Joi.string().max(255).presence(presence),
    description: Joi.string().max(65000).presence(presence),
    date: Joi.string().max(60).presence(presence),
    hour: Joi.string().max(60).presence(presence),
    typeEvent: Joi.string().max(60).presence("optional"),
    address: Joi.string().max(255),
    authorId: Joi.string().max(255),
    invitations: Joi.array(),
  }).validate(data, { abortEarly: false }).error;
};

export const updateEvent = async (data: Partial<IEvent>) => {
  const id = data.id;

  return await db.event
    .update({
      where: { id },
      data: {
        id: data.id,
        title: data.title,
        date: data.date,
        hour: data.hour,
        description: data.description,
        typeEvent: data.typeEvent,
        address: data.address,
      },
    })
    .catch((_) => false);
};
