import { component$ } from "@builder.io/qwik";
import { routeAction$, zod$, z, Form } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

export const useCreateUser = routeAction$(
  async (data, { redirect }) => {
    const prisma = new PrismaClient();
    await prisma.user.create({
      data,
    });

    throw redirect(302, "/users");
  },
  zod$({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
  })
);

export default component$(() => {
  const createUserAction = useCreateUser();
  return (
    <section>
      <h1>Create User</h1>
      <Form action={createUserAction}>
        <label>
          First name
          <input name="firstName" />
        </label>
        <label>
          Last name
          <input name="lastName" />
        </label>
        <label>
          Email
          <input name="email" />
        </label>
        <label>
          Password
          <input name="password" />
        </label>
        <button type="submit">Create</button>
      </Form>
      {createUserAction.value && (
        <div>
          {createUserAction.status === 200 && (
            <h2>User created successfully!</h2>
          )}
        </div>
      )}
    </section>
  );
});
