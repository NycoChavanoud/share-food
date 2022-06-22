import base from "../../../middlewares/common";
import { getAllUsers, IUser } from "../../../models/user";
import type { NextApiRequest, NextApiResponse } from "next";
import requireCurrentUser from "../../../middlewares/requireCurrentUser";

type NextApiRequestWithCurrentUser = NextApiRequest & {
  currentUser: IUser;
};

const handleGet = async (
  req: NextApiRequestWithCurrentUser,
  res: NextApiResponse
) => {
  res.send(await getAllUsers());
};

export default base().use(requireCurrentUser).get(handleGet);
