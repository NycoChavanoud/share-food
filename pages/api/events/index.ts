import base from "../../../middlewares/common";
import requireCurrentUser from "../../../middlewares/requireCurrentUser";
import type { NextApiRequest, NextApiResponse } from "next";
import { createEvent, getEvents, IEvent } from "../../../models/event";
import { IUser } from "../../../models/user";

type NextApiRequestWithCurrentUser = NextApiRequest & {
  currentUser: IUser;
};

type ReqBodyIEvent = Omit<IEvent, "id">;

const handlePost = async (
  req: NextApiRequestWithCurrentUser,
  res: NextApiResponse
) => {
  const user = req.currentUser;
  if (!user) return res.status(403).send("Forbidden, only for currents users");
  const { title, date, hour, description, typeEvent, address }: ReqBodyIEvent =
    req.body;
  return res.status(201).send(
    await createEvent({
      title,
      date,
      hour,
      description,
      typeEvent,
      address,
      authorId: req.currentUser.id,
    })
  );
};

const handleGet = async (
  req: NextApiRequestWithCurrentUser,
  res: NextApiResponse
) => {
  const user = req.currentUser;
  if (!user) return res.status(403).send("Forbidden, only for currents users");
  res.send(await getEvents());
};

export default base().use(requireCurrentUser).post(handlePost).get(handleGet);
