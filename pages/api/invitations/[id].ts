import base from "../../../middlewares/common";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  deleteInvitationbyEventId,
  getInvitations,
  getOneInvite,
  IInvitation,
} from "../../../models/invitations";
import requireCurrentUser from "../../../middlewares/requireCurrentUser";
import { IUser } from "../../../models/user";

type NextApiRequestwithCurrentEvent = NextApiRequest & {
  query: {
    id: number;
  };
  body: IInvitation;
  currentUser: IUser;
};

const handleGet = async (
  { query: { id } }: NextApiRequestwithCurrentEvent,
  res: NextApiResponse
) => {
  const idToGet = id.toString();
  const invitations = await getInvitations(idToGet);
  if (invitations) return res.send(invitations);
  else res.status(404).send("not found");
};

const handleDelete = async (
  { query: { id }, currentUser }: NextApiRequestwithCurrentEvent,
  res: NextApiResponse
) => {
  const idTodelete = id.toString();
  const invitation = await getOneInvite(idTodelete);
  if (invitation) {
    if (invitation.event?.authorId !== currentUser.id)
      return res.status(403).send("Forbidden");
    const invitationToDelete = await deleteInvitationbyEventId(idTodelete);
    if (invitationToDelete) return res.send(invitationToDelete);
    else res.status(404).send("not found");
  }
};

export default base()
  .use(requireCurrentUser)
  .get(handleGet)
  .delete(handleDelete);
