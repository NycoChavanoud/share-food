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
  { query: { id } }: NextApiRequestwithCurrentEvent,
  res: NextApiResponse
) => {
  const invitations = await getInvitations(id);
  if (invitations) return res.send(invitations);
};

const handleDelete = async (
  { query: { id } }: NextApiRequestwithCurrentEvent,
  res: NextApiResponse
) => {
  const invitationToDelete = await deleteInvitationbyEventId(id);

  if (invitationToDelete) return res.send(invitationToDelete);
};

export default base()
  .use(requireCurrentUser)
  .get(handleGet)
  .delete(handleDelete);
