import base from "../../../middlewares/common";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createUser,
  emailAlreadyExists,
  IUser,
  validateUser,
} from "../../../models/user";

type ReqBodyIUser = Omit<IUser, "city" | "description">;

const handleCreateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    id,
    firstname,
    lastname,
    email,
    nickName,
    birthday,
    favoritePlate,
    password,
  }: ReqBodyIUser = req.body;

  const validationErrors = validateUser(req.body);
  if (validationErrors) return res.status(422).send(validationErrors);
  const emailExist = await emailAlreadyExists(req.body.email);
  if (emailExist) return res.status(409).send("email already taken");

  return res.status(201).send(
    await createUser({
      id,
      firstname,
      lastname,
      email,
      nickName,
      birthday,
      favoritePlate,
      password,
    })
  );
};

export default base().post(handleCreateUser);
