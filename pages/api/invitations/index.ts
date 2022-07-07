import base from "../../../middlewares/common";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  createOneGuestForEvent,
  getInvitationsByUserId,
  getOneInviteByUserId,
  IInvitation,
  updateOneGuestStatus,
} from "../../../models/invitations";
import requireCurrentUser from "../../../middlewares/requireCurrentUser";
import { IUser } from "../../../models/user";
import { getOneEvent } from "../../../models/event";

type NextApiRequestBodyOfInvitation = NextApiRequest & {
  body: IInvitation;
  currentUser: IUser;
};

const handleCreateOne = async (
  req: NextApiRequestBodyOfInvitation,
  res: NextApiResponse
) => {
  const event = await getOneEvent(req.body.eventId);
  if (event) {
    if (event.authorId !== req.currentUser.id) {
      return res.status(403).send("Forbidden");
    }
    const invitationToCreate = await createOneGuestForEvent(req.body);
    if (invitationToCreate) return res.status(201).send(invitationToCreate);
    else res.status(404).send("not found");
  }
};

const handleGetInvitationsByUserId = async (
  req: NextApiRequestBodyOfInvitation,
  res: NextApiResponse
) => {
  const invitations = await getInvitationsByUserId(req.currentUser.id);
  if (invitations) return res.status(201).send(invitations);
  else res.status(404).send("not found");
};

export default base()
  .use(requireCurrentUser)
  .post(handleCreateOne)
  .get(handleGetInvitationsByUserId);
