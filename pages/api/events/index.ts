import base from "../../../middlewares/common";
import requireCurrentUser from "../../../middlewares/requireCurrentUser";
import type { NextApiRequest, NextApiResponse } from "next";
import { createEvent, getEvents, IEvent } from "../../../models/event";

type NextApiRequestWithCurrentUser = NextApiRequest & {
  currentUser: string;
};

type ReqBodyIEvent = Omit<IEvent, "id">;

const handlePost = async (
  req: NextApiRequestWithCurrentUser,
  res: NextApiResponse
) => {
  const { title, date, hour, description, typeEvent, address }: ReqBodyIEvent =
    req.body;
  return res
    .status(201)
    .send(
      await createEvent({ title, date, hour, description, typeEvent, address })
    );
};

const handleGet = async (
  req: NextApiRequestWithCurrentUser,
  res: NextApiResponse
) => {
  res.send(await getEvents());
};

export default base().use(requireCurrentUser).post(handlePost).get(handleGet);
