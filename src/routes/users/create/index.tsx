import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import { Container, Input } from "postcss";

export const useCreateUser = routeAction$(
  async (data, { redirect }) => {
    const prisma = new PrismaClient();
    await prisma.user.create({
      data,
    });

    throw redirect(302, "/users");
  },
  zod$({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
  })
);

export default component$(() => {
  const createUserAction = useCreateUser();

  const errors = (name: string) => {
    const hasFormErrors =
      createUserAction.value?.failed &&
      !!createUserAction.value.fieldErrors &&
      !!createUserAction.value.fieldErrors[name];

    return hasFormErrors ? createUserAction.value.fieldErrors[name] : [];
  };

  return (
    <>
      <div class="text-sm breadcrumbs">
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/users">Users</a>
          </li>
          <li>
            <a>Create</a>
          </li>
        </ul>
      </div>
      <Form action={createUserAction} style={{ width: "100%" }}>
        <div class="form-control">
          <label class="label">
            <span class="label-text">First name</span>
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            class="input input-bordered"
          />
          {createUserAction.value?.failed && (
            <span>
              {errors("firstName").map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </span>
          )}
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Last name</span>
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            class="input input-bordered"
          />
          {createUserAction.value?.failed && (
            <span>
              {errors("lastName").map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </span>
          )}
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            class="input input-bordered"
          />
          {createUserAction.value?.failed && (
            <span>
              {errors("lastName").map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </span>
          )}
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            class="input input-bordered"
          />
          {createUserAction.value?.failed && (
            <span>
              {errors("lastName").map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </span>
          )}
        </div>

        <div class="flex gap-5 flex-row mt-5">
          <button class="btn">Save</button>
        </div>
      </Form>
    </>
  );
});
