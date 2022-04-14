import morgan from "morgan";
import type { NextApiRequest } from "next";

morgan.token("reqbody", (req: NextApiRequest) =>
  JSON.stringify(req.body, null, 2)
);

const logger = morgan(
  ":method :url \nreq.body: :reqbody \n:status - :response-time ms\n"
);

export default logger;
