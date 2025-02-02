import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";

const app = new Hono();


app.get("/", (c) => {
  return c.text("Hello doctors")
})


Deno.serve(app.fetch);

