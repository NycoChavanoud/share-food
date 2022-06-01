import base from "../../../middlewares/common";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createOneGuestForEvent,
  IInvitation,
} from "../../../models/invitations";
import requireCurrentUser from "../../../middlewares/requireCurrentUser";

type NextApiRequestBodyOfInvitation = NextApiRequest & {
  body: IInvitation;
};

const handleCreateOne = async (
  req: NextApiRequestBodyOfInvitation,
  res: NextApiResponse
) => {
  const invitationToCreate = await createOneGuestForEvent(req.body);
  if (invitationToCreate) return res.status(201).send(invitationToCreate);
  else res.status(404).send("not found");
};

export default base().use(requireCurrentUser).post(handleCreateOne);
