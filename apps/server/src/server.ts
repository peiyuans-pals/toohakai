import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import {appRouter, createTRPCContext, trpcExpress} from "api"
import { renderTrpcPanel } from "trpc-panel";

const { json, urlencoded } = bodyParser

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/", (req, res)=> {
      return res.json({hello: "world"})
    })
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/healthz", (req, res) => {
      return res.json({ ok: true });
    })

    .use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext: createTRPCContext,
    }),
  );

  app.use("/trpc-panel", (_, res) => {
    return res.send(
      renderTrpcPanel(appRouter, { url: "http://localhost:5001/trpc" }) // todo
    );
  });

  return app;
};
