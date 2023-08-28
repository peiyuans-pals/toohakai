import bodyParser from "body-parser";
const { json, urlencoded } = bodyParser
import express from "express";
import morgan from "morgan";
import cors from "cors";

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
    });

  return app;
};
