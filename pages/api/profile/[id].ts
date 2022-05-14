import requireCurrentUser from "../../../middlewares/requireCurrentUser";
import {
  findById,
  getSafeAttributes,
  IUser,
  updateUser,
} from "../../../models/user";
import base from "../../../middlewares/common";
import { NextApiResponse } from "next";

type requestProfileType = {
  query: any;
  id: any;
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
  if (profile) res.send(getSafeAttributes(profile));
  else res.status(404).send("not found");
};

const handlePatch = async (
  { query: { id }, body }: requestProfileType,
  res: NextApiResponse
) => {
  const newData = { ...body };
  console.log("newDATA : ", newData);
  const profileUpdated = await updateUser(id, newData);
  if (newData) res.send(profileUpdated);
  else res.status(404).send("not found");
};

export default base().use(requireCurrentUser).get(handleGet).patch(handlePatch);
