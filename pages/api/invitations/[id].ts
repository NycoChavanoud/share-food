import base from "../../../middlewares/common";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  deleteInvitationbyEventId,
  getInvitations,
  IInvitation,
} from "../../../models/invitations";
import requireCurrentUser from "../../../middlewares/requireCurrentUser";

type NextApiRequestwithCurrentEvent = NextApiRequest & {
  query: {
    id: number;
  };
  body: IInvitation;
};

const handleGet = async (
  { query: { id }, body }: NextApiRequestwithCurrentEvent,
  res: NextApiResponse
) => {
  console.log(" handleGETTTT : ", id, "et...");
  const invitations = await getInvitations(id);
  if (invitations) return res.send(invitations);
  else res.status(404).send("not found");
};

const handleDelete = async (
  { query: { id } }: NextApiRequestwithCurrentEvent,
  res: NextApiResponse
) => {
  const invitationToDelete = await deleteInvitationbyEventId(id);
  if (invitationToDelete) return res.send(invitationToDelete);
  else res.status(404).send("not found");
};

export default base()
  .use(requireCurrentUser)
  .get(handleGet)
  .delete(handleDelete);
