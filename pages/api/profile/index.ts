import base from "../../../middlewares/common";
import { getSafeAttributes } from "../../../models/user";
import type { NextApiRequest, NextApiResponse } from "next";
import requireCurrentUser from "../../../middlewares/requireCurrentUser";

type NextApiRequestWithCurrentUser = NextApiRequest & {
  currentUser: string;
};

async function handleGet(
  req: NextApiRequestWithCurrentUser,
  res: NextApiResponse
) {
  res.send(getSafeAttributes(req.currentUser));
}

export default base().use(requireCurrentUser).get(handleGet);
