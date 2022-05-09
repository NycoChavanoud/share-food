import db from "../lib/prisma";
import { hashPassword } from "../models/user";

const dateOfDay = new Date().toISOString();

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
  await db.event.deleteMany();
  await db.event.create({
    data: {
      title: "event of the day",
      description: "lorem ipsum patatum et tatadoum ",
      date: dateOfDay,
      hour: "12:30",
      address: "50 rue de la soif, LYON",
      typeEvent: "Au bureau",
      authorId: user.id,
    },
  });
}

seed();
