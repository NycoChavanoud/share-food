import { deleteOneEvent, getOneEvent } from "../../../models/event";
import base from "../../../middlewares/common";
import requireCurrentUser from "../../../middlewares/requireCurrentUser";
import { NextApiResponse } from "next";
import { IUser } from "../../../models/user";

type requestEventType = {
  query: any;
  id: any;
  currentUser: IUser;
};

const handleGet = async (
  { query: { id } }: requestEventType,
  res: NextApiResponse
) => {
  const event = await getOneEvent(id);
  if (event) res.send(event);
  else res.status(404).send("not found");
};

const handleDelete = async (
  { query: { id }, currentUser }: requestEventType,
  res: NextApiResponse
) => {
  const event = await getOneEvent(id);
  const authorId = event?.authorId;
  if (currentUser.id !== authorId)
    return res.status(403).send("Nein Nein Nein. Es ist Verbotton");
  if (await deleteOneEvent(id)) return res.status(204).send("event deleted");
  res.status(404).send("not deleted");
};

export default base()
  .use(requireCurrentUser)
  .get(handleGet)
  .delete(handleDelete);
