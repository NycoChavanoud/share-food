import db from "../lib/prisma";
import argon2 from "argon2";
import Joi from "joi";

export interface IUser {
  id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  nickName: string;
  birthday: string;
  favoritePlate: string;
  city?: string;
  description?: string;
  avatarUrl?: string;
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
  city,
  description,
  avatarUrl,
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
      city,
      description,
      avatarUrl,
    },
  });
};

export const deleteManyUsers = db.user.deleteMany;

export const deleteOneUser = db.user.delete;

export const deleteUserById = async (id: string) => {
  return await db.user
    .delete({
      where: { id },
    })
    .catch(() => null);
};
export const deleteUserByEmail = (email: string) =>
  db.user.delete({ where: { email } }).catch(() => false);

export const findByEmail = (email: string) =>
  db.user.findUnique({ where: { email } }).catch(() => null);

export const findById = async (id: string) =>
  db.user
    .findUnique({
      where: { id },
    })
    .catch(() => null);

export const emailAlreadyExists = (email: string) =>
  db.user.findFirst({ where: { email } }).then((user: any) => !!user);

export const getAllUsers = () => db.user.findMany();

export const getSafeAttributes = (user: any) => ({
  ...user,
  hashPassword: undefined,
});

export const validateUser = (data: Partial<IUser>, forUpdate = false) => {
  const presence = forUpdate ? "optional" : "required";
  return Joi.object({
    firstname: Joi.string().max(255).presence(presence),
    lastname: Joi.string().max(255).presence(presence),
    email: Joi.string().email().presence(presence),
    password: Joi.string().min(8).presence(presence),
    nickName: Joi.string().max(255),
    favoritePlate: Joi.string().max(255),
    birthday: Joi.string().max(255),
    city: Joi.string().max(255),
    description: Joi.string(),
    avatarUrl: Joi.string(),
  }).validate(data, { abortEarly: false }).error;
};

export const updateUser = (id: string, data: Partial<IUser>) =>
  db.user
    .update({
      where: { id },
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        nickName: data.nickName,
        birthday: data.birthday,
        favoritePlate: data.favoritePlate,
        city: data.city,
        description: data.description,
        avatarUrl: data.avatarUrl,
      },
    })
    .catch(() => null);
