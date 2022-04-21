import db from "../lib/prisma";

export interface IEvent {
  title: string;
  description: string;
  date: string;
  hour: string;
  typeEvent: string;
  adress: string;
}

const eventPropsToShow = {
  title: true,
  id: true,
  description: true,
  date: true,
  hour: true,
  typeEvent: true,
  adress: true,
};

export const createEvent = async ({
  title,
  description,
  date,
  hour,
  typeEvent,
  adress,
}: IEvent) => {
  return db.event.create({
    data: { title, description, date, hour, typeEvent, adress },
  });
};

//Voir avec Pierre...
export const getEvents = async () => {
  return db.event.findMany({ select: eventPropsToShow });
};

export const getOneEvent = (id: any) => {
  return db.event.findUnique({
    where: { id: parseInt(id, 10) },
    select: eventPropsToShow,
  });
};