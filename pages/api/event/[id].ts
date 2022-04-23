import { getOneEvent } from "../../../models/event";
import base from "../../../middlewares/common";
import requireCurrentUser from "../../../middlewares/requireCurrentUser";
import { NextApiResponse } from "next";

// async function handleGet({ query: { id } }, res) {
//     const project = await getOneProject(id);
//     if (project) res.send(project);
//     else res.status(404).send();
//   }

type getId = {
  query: any;
  id: any;
};

const handleGet = async ({ query: { id } }: getId, res: NextApiResponse) => {
  const event = await getOneEvent(id);
  if (event) res.send(event);
  else res.status(404).send("no event get");
};

export default base().use(requireCurrentUser).get(handleGet);
