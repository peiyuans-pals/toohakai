import supertest from "supertest";
import { createApp } from "../app.js";

describe("server", () => {
  it("health check returns 200", async () => {
    await supertest(createApp())
      .get("/healthz")
      .expect(200)
      .then((res) => {
        expect(res.body.ok).toBe(true);
      });
  });

  it("message endpoint says hello", async () => {
    await supertest(createApp())
      .get("/message/jared")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ message: "hello jared" });
      });
  });
});
