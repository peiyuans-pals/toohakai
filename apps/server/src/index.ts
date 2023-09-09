import "dotenv/config";
import { createServer } from "./server.js";
import { log } from "logger";

const port = process.env.PORT || 5001;
const server = createServer();

server.listen(port, () => {
  // log(`api running on ${port}`);
  log(`ready started web on 0.0.0.0:${port}, url: http://localhost:${port}`);
});
