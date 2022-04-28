import db from "../lib/prisma";

export interface IEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  hour: string;
  typeEvent: string;
  address: string;
  diff?: number;
}

const eventPropsToShow = {
  title: true,
  id: true,
  description: true,
  date: true,
  hour: true,
  typeEvent: true,
  address: true,
};

export const createEvent = async ({
  title,
  description,
  date,
  hour,
  typeEvent,
  address,
}: Omit<IEvent, "id">) => {
  return db.event.create({
    data: { title, description, date, hour, typeEvent, address },
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
    select: eventPropsToShow,
  });
};

export const deleteOneEvent = (id: any) => {
  return db.event
    .delete({
      where: { id: parseInt(id, 10) },
    })
    .catch((_) => false);
};
