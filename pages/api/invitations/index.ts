import base from "../../../middlewares/common";
import requireCurrentUser from "../../../middlewares/requireCurrentUser";
import type { NextApiRequest, NextApiResponse } from "next";
import { IEvent } from "../../../models/event";
import { getInvitations } from "../../../models/invitations";

type NextApiRequestwithCurrentEvent = NextApiRequest & {
  event: IEvent;
};

const handleGet = async (
  req: NextApiRequestwithCurrentEvent,
  res: NextApiResponse
) => {
  res.send(await getInvitations());
};

export default base().use(requireCurrentUser).get(handleGet);
