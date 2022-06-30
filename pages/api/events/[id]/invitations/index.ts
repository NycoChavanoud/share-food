import { NextApiRequest, NextApiResponse } from "next";
import base from "../../../../../middlewares/common";
import requireCurrentUser from "../../../../../middlewares/requireCurrentUser";
import { getInvitations } from "../../../../../models/invitations";

type NextApuRequestInvitEvent = NextApiRequest & {
  query: {
    id: number;
  };
};

const handleGet = async (
  { query: { id } }: NextApuRequestInvitEvent,
  res: NextApiResponse
) => {
  const idToGet = id.toString();
  const invitations = await getInvitations(idToGet);
  if (invitations) return res.send(invitations);
  else res.status(404).send("not found");
};

export default base().use(requireCurrentUser).get(handleGet);
