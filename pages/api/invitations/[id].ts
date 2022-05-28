import base from "../../../middlewares/common";
import type { NextApiRequest, NextApiResponse } from "next";
import { IEvent } from "../../../models/event";
import { getInvitations, IInvitation } from "../../../models/invitations";

type NextApiRequestwithCurrentEvent = NextApiRequest & {
  eventId: IEvent;
  query: any;
  body: IInvitation;
  id: number;
};

const handleGet = async (
  { query: { id }, body }: NextApiRequestwithCurrentEvent,
  res: NextApiResponse
) => {
  const invitations = await getInvitations(id);
  if (invitations) return res.send(invitations);
};

export default base().get(handleGet);
