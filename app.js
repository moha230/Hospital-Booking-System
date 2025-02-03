import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import * as userController from "./userController.js";

const app = new Hono();

app.get("/v1/users", userController.showForm);
app.get("/v1/users/:id", userController.showUser);
app.post("/v1/users", userController.createUser);
app.post("/v1/users/:id", userController.updateUser);
app.post("/v1/users/:id/delete", userController.deleteUser);

export default app;

