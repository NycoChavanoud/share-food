import base from "../../../middlewares/common";
import type { NextApiRequest, NextApiResponse } from "next";
import { createUser, hashPassword } from "../../../models/user";

const handleCreateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  //const hashedPassword = await hashPassword();
  const {
    firstname,
    lastname,
    email,
    nickName,
    birthday,
    favoritePlate,
    password,
  } = req.body;
  return res
    .status(201)
    .send(
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
