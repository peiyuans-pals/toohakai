import {appRouter} from "../utils/lib";

//TODO
// see: https://github.com/trpc/trpc/discussions/1740

describe("index.ts", ()=> {
  it("should pass", ()=> {
    expect(appRouter).not.toBe(null)
  })
})
