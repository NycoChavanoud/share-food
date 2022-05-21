import db from "../lib/prisma";
import Joi from "joi";
import { IUser } from "./user";

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
  guestId: IUser;
  status: string;
  invitations: any;
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
  return await db.event.create({
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
  });
};

export const getEvents = async () => {
  const dateOfDay = new Date().toISOString().substring(0, 10);
  return db.event.findMany({
    select: eventPropsToShow,
    orderBy: {
      date: "asc",
    },
    where: {
      date: {
        gte: dateOfDay,
      },
    },
  });
};

export const getOneEvent = (id: any) => {
  return db.event.findUnique({
    where: { id: parseInt(id, 10) },

    include: {
      author: true,
    },
  });
};

export const deleteOneEvent = (id: any) => {
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
