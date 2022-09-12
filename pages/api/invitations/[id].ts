import base from "../../../middlewares/common";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  deleteInvitationbyEventId,
  getOneInvite,
  getOneInviteByUserId,
  IInvitation,
  updateOneGuestStatus,
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

const handleGetOne = async (
  req: NextApiRequestwithCurrentEvent,
  res: NextApiResponse
) => {
  const id = req.query.id.toString();
  const invitation = await getOneInvite(id);
  if (invitation) {
    if (invitation.event?.authorId !== req.currentUser.id)
      return res.status(403).send("Forbidden");
    res.status(201).send(invitation);
  } else res.status(404).send("not found");
};

const handlePatch = async (
  req: NextApiRequestwithCurrentEvent,
  res: NextApiResponse
) => {
  const { eventId, guestId, status, guest } = req.body;
  const { id } = req.query;
  const currentUserInvite = await getOneInviteByUserId(
    req.currentUser.id,
    id.toString()
  );
  if (!currentUserInvite) return res.status(403).send("Forbidden");

  const invitationToPatch = await updateOneGuestStatus({
    id,
    eventId,
    guestId,
    status,
    guest,
  });
  if (invitationToPatch) res.status(201).send({ invitationToPatch });
  else res.status(404).send("not found");
};

export default base()
  .use(requireCurrentUser)
  .delete(handleDelete)
  .get(handleGetOne)
  .patch(handlePatch);
