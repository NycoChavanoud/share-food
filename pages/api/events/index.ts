import base from "../../../middlewares/common";
import requireCurrentUser from "../../../middlewares/requireCurrentUser";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createEvent,
  getEvents,
  IEvent,
  validateEvent,
} from "../../../models/event";
import { IUser } from "../../../models/user";

type NextApiRequestWithCurrentUser = NextApiRequest & {
  currentUser: IUser;
};

type ReqBodyIEvent = Omit<IEvent, "id" | "author">;

const handlePost = async (
  req: NextApiRequestWithCurrentUser,
  res: NextApiResponse
) => {
  const { title, date, hour, description, typeEvent, address }: ReqBodyIEvent =
    req.body;

  const validationErrors = validateEvent(req.body);
  if (validationErrors) return res.status(422).send(validationErrors);

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
  res.send(await getEvents());
};

export default base().use(requireCurrentUser).post(handlePost).get(handleGet);
