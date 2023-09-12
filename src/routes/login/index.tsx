import { component$ } from "@builder.io/qwik";
import {
  routeAction$,
  type DocumentHead,
  z,
  zod$,
  Form,
} from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

export const useLogin = routeAction$(
  async (data, { cookie, env, redirect, fail }) => {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
        password: data.password,
      },
    });

    if (user) {
      cookie.set(env.get("SESSION_COOKIE")!, user, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        maxAge: data.remember ? 24 * 60 * 60 * 7 : undefined,
      });

      throw redirect(302, "/users");
    }

    return fail(400, {
      message: "The email or password are invalid",
    });
  },
  zod$({
    email: z.string().email().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
    remember: z.ostring(),
  })
);

export default component$(() => {
  const loginUser = useLogin();

  const errors = (name: string) => {
    const hasFormErrors =
      loginUser.value?.failed &&
      !!loginUser.value.fieldErrors &&
      !!loginUser.value.fieldErrors[name];

    return hasFormErrors ? loginUser.value.fieldErrors[name] : [];
  };

  return (
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left">
          <h1 class="text-5xl font-bold">Login now!</h1>
          <p class="py-6">Welcome to The Platform</p>
        </div>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div class="card-body">
            <Form action={loginUser}>
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
                {loginUser.value?.failed && (
                  <span>
                    {errors("email").map((error: string) => (
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
                {loginUser.value?.failed && (
                  <span>
                    {errors("password").map((error: string) => (
                      <p key={error}>{error}</p>
                    ))}
                  </span>
                )}
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Remember</span>
                  <input
                    type="checkbox"
                    name="remember"
                    class="toggle"
                    checked
                  />
                </label>
              </div>

              <div class="form-control mt-6">
                <button class="btn btn-primary">Login</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Login",
  meta: [
    {
      name: "description",
      content: "Login",
    },
  ],
};
