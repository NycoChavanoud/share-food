import base from "../../../middlewares/common";
import requireCurrentUser from "../../../middlewares/requireCurrentUser";
import type { NextApiRequest, NextApiResponse } from "next";
import { createEvent, getEvents } from "../../../models/event";

type NextApiRequestWithCurrentUser = NextApiRequest & {
  currentUser: string;
};

const handlePost = async (
  req: NextApiRequestWithCurrentUser,
  res: NextApiResponse
) => {
  const { title, date, hour, description, typeEvent, adress } = req.body;
  return res
    .status(201)
    .send(
      await createEvent({ title, date, hour, description, typeEvent, adress })
    );
};

const handleGet = async (
  req: NextApiRequestWithCurrentUser,
  res: NextApiResponse
) => {
  res.send(await getEvents());
};

export default base().use(requireCurrentUser).post(handlePost).get(handleGet);