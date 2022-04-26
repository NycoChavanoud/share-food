import db from "../lib/prisma";
import { hashPassword } from "../models/user";

export async function seed() {
  await db.user.deleteMany();
  await db.user.create({
    data: {
      firstname: "Dave",
      lastname: "Lopper",
      email: "dave.lopper@gmail.com",
      hashedPassword: await hashPassword("azertyuiop"),
      nickName: "DavidHasseloff",
      birthday: "1982-06-08",
      favoritePlate: "pastaBox",
    },
  });
}

seed();
