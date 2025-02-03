import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";

const app = new Hono();


app.get("/", (c) => {
  return c.text("Hello doctors")
})


//A post request that a user can create a user 
app.get("/userRegister", (c) => {
  return c.text("Hello doctors")
})


app.post("/userRegister" , (c) => {
  const body = c.req.parseBody();
  console.log(body);

   return c.redirect("/")
})

Deno.serve(app.fetch);

