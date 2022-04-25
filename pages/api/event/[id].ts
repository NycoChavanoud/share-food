import { deleteOneEvent, getOneEvent } from "../../../models/event";
import base from "../../../middlewares/common";
import requireCurrentUser from "../../../middlewares/requireCurrentUser";
import { NextApiResponse } from "next";

type getId = {
  query: any;
  id: any;
};

const handleGet = async ({ query: { id } }: getId, res: NextApiResponse) => {
  const event = await getOneEvent(id);
  if (event) res.send(event);
  else res.status(404).send("not found");
};

const handleDelete = async ({ query: { id } }: getId, res: NextApiResponse) => {
  if (await deleteOneEvent(id)) res.status(204).send("event deleted");
  else res.status(404).send("not deleted");
};

export default base()
  .use(requireCurrentUser)
  .get(handleGet)
  .delete(handleDelete);
