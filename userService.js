const createUser = async (user) => {
  user.id = crypto.randomUUID();

  const kv = await Deno.openKv();
  await kv.set(["users", user.id], user);
};

const listUsers = async () => {
  const kv = await Deno.openKv();
  const userEntries = await kv.list({ prefix: ["users"] });

  const users = [];
  for await (const entry of userEntries) {
    users.push(entry.value);
  }

  return users;
};

const getUser = async (id) => {
  const kv = await Deno.openKv();
  const user = await kv.get(["users", id]);
  return user?.value ?? {};
};

const updateUser = async (id, user) => {
  user.id = id;
  const kv = await Deno.openKv();
  await kv.set(["users", id], user);
};

const deleteUser = async (id) => {
  const kv = await Deno.openKv();
  await kv.delete(["users",id]);
}


export {createUser,listUsers,getUser,updateUser,deleteUser}