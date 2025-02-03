import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import * as userService from "./userService.js";

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const showForm = async (c) => {
  return c.html(
    eta.render("users.eta", { users: await userService.listUsers() }),
  );
};

const createUser = async (c) => {
  const body = await c.req.parseBody();
  await userService.createUser(body);
  return c.redirect("/v1/users");
};

const showUser = async (c) => {
  const id = c.req.param("id");
  return c.html(
    eta.render("user.eta", { user: await userService.getUser(id) }),
  );
};

const updateUser = async (c) => {
  const id = c.req.param("id");
  const body = await c.req.parseBody();
  await userService.updateUser(id, body);
  return c.redirect(`/v1/users/${id}`);
};


const deleteUser = async (c) => {
  const id = c.req.param("id");
  await userService.deleteUser(id);
  return c.redirect("/v1/users");
}


export { createUser, showForm, showUser, updateUser,deleteUser };