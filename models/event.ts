import db from "../lib/prisma";

export interface IEvent {
  title: string;
  description: string;
  date: Date;
  hour: Date;
  type: string;
  adress: string;
}

const eventPropsToShow = {
  title: true,
  id: true,
  description: true,
  mainPictureUrl: true,
};

export const createEvent = async ({
  title,
  description,
  date,
  hour,
  type,
  adress,
}: IEvent) => {
  return db.event.create({
    data: { title, description, date, hour, type, adress },
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
