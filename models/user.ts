import db from "../lib/prisma";
import argon2 from "argon2";

export interface IUser {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  nickName: string;
  birthday: string;
  favoritePlate: string;
}

const hashingOptions = {
  memoryCost: 2 ** 16,
  timeCost: 5,
  type: argon2.argon2id,
};

export const hashPassword = (plainPassword: string) =>
  argon2.hash(plainPassword, hashingOptions);

export const verifyPassword = (plainPassword: string, hashedPassword: string) =>
  argon2.verify(hashedPassword, plainPassword, hashingOptions);

export const createUser = async ({
  email,
  password,
  firstname,
  lastname,
  nickName,
  birthday,
  favoritePlate,
}: IUser) => {
  const hashedPassword = await hashPassword(password);
  return db.user.create({
    data: {
      email,
      hashedPassword,
      firstname,
      lastname,
      nickName,
      birthday,
      favoritePlate,
    },
  });
};

export const deleteManyUsers = db.user.deleteMany;

export const deleteOneUser = db.user.delete;

export const findByEmail = (email: string) =>
  db.user.findUnique({ where: { email } });

export const emailAlreadyExists = (email: string) =>
  db.user.findFirst({ where: { email } }).then((user) => !!user);

export const deleteUserByEmail = (email: string) =>
  db.user.delete({ where: { email } }).catch(() => false);

export const getSafeAttributes = (user: any) => ({
  ...user,
  hashPassword: undefined,
});
