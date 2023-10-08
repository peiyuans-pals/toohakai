import "dotenv/config";
import { createApp } from "./app.js";
import { log } from "logger";
import http from "http";
import { WebSocketServer } from "ws";
import { appRouter, AppRouter, createTrpcContext } from "api";
import { applyWSSHandler } from "@trpc/server/adapters/ws";

const port = process.env.PORT || 5001;
const app = createApp();
const server = http.createServer(app);

// web socket server
// const wss = new WebSocket.Server({ server: app })
const wss = new WebSocketServer({ server });
const wsHandler = applyWSSHandler<AppRouter>({
  wss,
  router: appRouter,
  createContext: createTrpcContext
});

server.listen(port, () => {
  // log(`api running on ${port}`);
  log(`ready started web on 0.0.0.0:${port}, url: http://localhost:${port}`);
});
server.on("error", console.error);

process.on("SIGTERM", () => {
  wsHandler.broadcastReconnectNotification();
  wss.close();
  server.close();
});
