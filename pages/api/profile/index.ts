import base from "../../../middlewares/common";
import { getSafeAttributes } from "../../../models/user";
import type { NextApiRequest, NextApiResponse } from "next";

async function handleGet(req: any, res: NextApiResponse) {
  res.send(getSafeAttributes(req.currentUser));
}

//etendre le type request sur next

export default base().get(handleGet);
