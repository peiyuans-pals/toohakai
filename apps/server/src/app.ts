import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { appRouter, createTrpcContext, trpcExpress } from "api";
import { renderTrpcPanel } from "trpc-panel";

const { json, urlencoded } = bodyParser;

export const createApp = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(
      cors()
      //   {
      //   // origin: "http://localhost:3002", // todo
      //   origin: (origin, callback) => {
      //     if (
      //       ["https://toohakai.fun", "http://localhost:3002"].includes(
      //         origin ?? ""
      //       )
      //     ) {
      //       callback(null, true);
      //     } else {
      //       callback(new Error("Not allowed by CORS"));
      //     }
      //   },
      //   credentials: true
      // }
    )
    .get("/", (_req, res) => {
      return res.json({ hello: "world" });
    })
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/healthz", (_req, res) => {
      return res.json({ ok: true });
    })
    // trpc
    .use(
      "/trpc",
      trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext: createTrpcContext
      })
    );

  app.use("/trpc-panel", (_, res) => {
    return res.send(
      renderTrpcPanel(appRouter, {
        url: "http://localhost:5001/trpc",
        transformer: "superjson"
      }) // todo
    );
  });

  return app;
};
