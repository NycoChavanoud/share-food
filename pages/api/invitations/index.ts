import base from "../../../middlewares/common";
import type { NextApiRequest, NextApiResponse } from "next";
import { IEvent } from "../../../models/event";
import { getInvitations } from "../../../models/invitations";

type NextApiRequestwithCurrentEvent = NextApiRequest & {
  eventId: IEvent;
};

const handleGet = async (
  req: NextApiRequestwithCurrentEvent,
  res: NextApiResponse
) => {
  let referer: any = req.headers.referer;
  const numberToRemove = `${process.env.NEXTAUTH_URL}`.length + 8;
  if (referer) {
    referer = referer.substr(numberToRemove);
    const eventId = parseInt(referer);

    const invitations = await getInvitations(eventId);
    if (invitations) return res.send(invitations);
  }
};

export default base().get(handleGet);
