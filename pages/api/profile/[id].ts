import requireCurrentUser from "../../../middlewares/requireCurrentUser";
import {
  deleteUserById,
  findById,
  getSafeAttributes,
  IUser,
  updateUser,
} from "../../../models/user";
import base from "../../../middlewares/common";
import { NextApiResponse } from "next";

type requestProfileType = {
  query: any;
  id: string;
  currentUser: IUser;
  body: IUser;
};

const handleGet = async (
  { query: { id }, currentUser }: requestProfileType,
  res: NextApiResponse
) => {
  if (id === "me") {
    return res.send(getSafeAttributes(currentUser));
  }
  const profile = await findById(id);
  if (profile) res.send(getSafeAttributes(profile as any));
  else res.status(404).send("not found");
};

const handlePatch = async (
  { body, currentUser }: requestProfileType,
  res: NextApiResponse
) => {
  const profileUpdated = await updateUser(currentUser.id, body);
  if (profileUpdated) res.send({ profileUpdated });
  else res.status(404).send("not found");
};

const handleDelete = async (
  { query: { id }, currentUser }: requestProfileType,
  res: NextApiResponse
) => {
  if (id !== currentUser.id) {
    return res.status(403).send("Forbidden");
  }
  if (await deleteUserById(id)) return res.status(204).send("user deleted");
  res.status(404).send("not deleted");
};

export default base()
  .use(requireCurrentUser)
  .get(handleGet)
  .patch(handlePatch)
  .delete(handleDelete);
