import base from "../../../middlewares/common";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createUser,
  emailAlreadyExists,
  validateUser,
} from "../../../models/user";

const handleCreateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    firstname,
    lastname,
    email,
    nickName,
    birthday,
    favoritePlate,
    password,
  } = req.body;

  //   const validationErrors = await validateUser(req.body);
  //   if (validationErrors) res.status(422).send(validationErrors);
  const emailExist = await emailAlreadyExists(req.body.email);
  if (emailExist) return res.status(409).send("email already taken");

  return res.status(201).send(
    await createUser({
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
