import { NextApiResponse } from "next";
import base from "../../../middlewares/common";
import requireCurrentUser from "../../../middlewares/requireCurrentUser";
import { findById } from "../../../models/user";

type requestUserType = {
  query: any;
  id: any;
};

const handleGetOne = async (
  { query: { id } }: requestUserType,
  res: NextApiResponse
) => {
  const user = await findById(id);
  if (user) res.send(user);
  else res.status(404).send("not found");
};

export default base().use(requireCurrentUser).get(handleGetOne);
