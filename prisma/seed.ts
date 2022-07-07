import db from "../lib/prisma";
import { hashPassword } from "../models/user";

const dateOfDay = new Date().toISOString();

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export async function seed() {
  await db.user.deleteMany();
  const user = await db.user.create({
    data: {
      firstname: "Dave",
      lastname: "Lopper",
      email: "dave.lopper@gmail.com",
      hashedPassword: await hashPassword("azertyuiop"),
      nickName: "DavidHasseloff",
      birthday: "1982-06-08",
      favoritePlate: "pastaBox",
      city: "Lyon",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis facilis exercitationem laborum molestias natus reprehenderit earum vero non, neque minus at aut commodi recusandae possimus amet delectus? Beatae, tempora quae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis facilis exercitationem laborum molestias natus reprehenderit earum vero non, neque minus at aut commodi recusandae possimus amet delectus? Beatae, tempora quae!",
    },
  });
  const secondUser = await db.user.create({
    data: {
      firstname: "Hello",
      lastname: "World",
      email: "hello.world@gmail.com",
      hashedPassword: await hashPassword("azertyuiop"),
      nickName: "GoGle",
      birthday: "1992-05-08",
      favoritePlate: "burger",
      city: "Macon",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis facilis exercitationem laborum molestias natus reprehenderit earum vero non, neque minus at aut commodi recusandae possimus amet delectus? Beatae, tempora quae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis facilis exercitationem laborum molestias natus reprehenderit earum vero non, neque minus at aut commodi recusandae possimus amet delectus? Beatae, tempora quae!",
    },
  });

  await db.user.createMany({
    data: [
      {
        firstname: "Nico",
        lastname: "Chavanoud",
        email: "nico@gmail.com",
        hashedPassword: await hashPassword("azertyuiop"),
        nickName: "Creator",
        birthday: "1982-06-08",
        favoritePlate: "kebab",
        city: "Lyon",
        description:
          "Corporis facilis exercitationem.Beatae, tempora quae! Lorem ipsum dolor sit amet consectetur adipisicing elit.  Laborum molestias natus reprehenderit earum vero non, neque minus at aut commodi recusandae possimus amet delectus? Beatae, tempora quae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis facilis exercitationem laborum molestias natus reprehenderit earum vero non, neque minus at aut commodi recusandae possimus amet delectus? ",
      },
      {
        firstname: "Toto",
        lastname: "Larico",
        email: "toto@gmail.com",
        hashedPassword: await hashPassword("azertyuiop"),
        nickName: "Larry&Co",
        birthday: "1998-07-12",
        favoritePlate: "Chili",
        city: "Paris",
        description:
          " Tempora quae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis facilis exercitationem laborum molestias natus reprehenderit earum vero non, neque minus at aut commodi recusandae possimus amet delectus? facilis exercitationem laborum molestias natus reprehenderit earum vero non, neque minus at aut commodi recusandae possimus amet delectus? Beatae, Beatae, tempora quae!",
      },
      {
        firstname: "Jean",
        lastname: "Bon",
        email: "Jeannot@gmail.com",
        hashedPassword: await hashPassword("azertyuiop"),
        nickName: "Lardus",
        birthday: "1994-07-22",
        favoritePlate: "Choucroute",
        city: "Strasbourg",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, debitis.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, debitis. ",
      },
      {
        firstname: "Paul",
        lastname: "Pulpos",
        email: "paul@gmail.com",
        hashedPassword: await hashPassword("azertyuiop"),
        nickName: "El pulpo",
        birthday: "2001-12-20",
        favoritePlate: "fondant choco",
        city: "Fréjus",
        description:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus quibusdam veritatis odit voluptates ipsa natus sequi fugit beatae, optio sint repellendus maiores at incidunt obcaecati!",
      },
      {
        firstname: "Gautier",
        lastname: "Juste",
        email: "juste@gmail.com",
        hashedPassword: await hashPassword("azertyuiop"),
        nickName: "JG",
        birthday: "1978-02-12",
        favoritePlate: "raclette",
        city: "toulouse",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ut quod excepturi odit laboriosam!",
      },
    ],
  });

  await db.event.deleteMany();
  const event = await db.event.create({
    data: {
      title: "event of the day",
      description: "lorem ipsum patatum et tatadoum ",
      date: dateOfDay,
      hour: "12:30",
      address: "50 rue de la soif, LYON",
      typeEvent: "Au bureau",
      authorId: secondUser.id,
    },
  });
  const secondEvent = await db.event.create({
    data: {
      title: "other event",
      description: "lorem ipsum patatum et tatadoum ",
      date: randomDate(new Date(), new Date(2025, 0, 1)).toISOString(),
      hour: "12:30",
      address: "50 rue de la soif, LYON",
      typeEvent: "Au bureau",
      authorId: secondUser.id,
    },
  });

  const thirdEvent = await db.event.create({
    data: {
      title: "other event again",
      description: "lorem ipsum patatum et tatadoum ",
      date: randomDate(new Date(), new Date(2025, 0, 1)).toISOString(),
      hour: "12:30",
      address: "50 rue de la soif, LYON",
      typeEvent: "Au bureau",
      authorId: secondUser.id,
    },
  });

  await db.event.createMany({
    data: [
      {
        title: "second event",
        description: "lorem ipsum patatum et tatadoum ",
        date: randomDate(new Date(), new Date(2025, 0, 1)).toISOString(),
        hour: "20:30",
        address: " 25 rue de la montée, LYON",
        typeEvent: "Au resto",
        authorId: user.id,
      },
      {
        title: "un autre event",
        description: "lorem ipsum patatum et tatadoum ",
        date: randomDate(new Date(), new Date(2025, 0, 1)).toISOString(),
        hour: "20:30",
        address: "rue du mistral",
        typeEvent: "Au bureau",
        authorId: user.id,
      },
      {
        title: "et une dernier",
        description: "lorem ipsum patatum et tatadoum ",
        date: randomDate(new Date(), new Date(2025, 0, 1)).toISOString(),
        hour: "20:30",
        address: "rue du mistral",
        typeEvent: "A la maison",
        authorId: user.id,
      },
    ],
  });

  await db.invitation.create({
    data: {
      guestId: user.id,
      eventId: event.id,
      status: "PENDING",
    },
  });
  await db.invitation.create({
    data: {
      guestId: user.id,
      eventId: secondEvent.id,
      status: "PENDING",
    },
  });
  await db.invitation.create({
    data: {
      guestId: user.id,
      eventId: thirdEvent.id,
      status: "ACCEPTED",
    },
  });

  await db.event.findUnique({
    where: { id: event.id },

    include: {
      author: true,
      invitations: true,
    },
  });

  await db.event.create({
    data: {
      invitations: {
        create: [
          {
            guestId: user.id,
            status: "REFUSED",
          },
        ],
      },
      title: "test",
      description: "lorem ipsum patatum ezeffezfezfzefzeft tatadoum ",
      date: dateOfDay,
      hour: "12:30",
      address: "50 rue de la soif, LYON",
      typeEvent: "Au bureau",
      authorId: secondUser.id,
    },
  });
}

seed();
