import { findByEmail } from "../models/user";
import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";

type NextApiRequestWithCurrentUser = NextApiRequest & {
  currentUser: User | null;
};

const requireCurrentUser = async (
  req: NextApiRequestWithCurrentUser,
  res: NextApiResponse,
  next: Function
) => {
  const session = await getSession({ req });
  req.currentUser = await findByEmail(session?.user?.email || "");
  if (!req.currentUser) res.status(401).send("Unauthorized");
  else next();
};

export default requireCurrentUser;
