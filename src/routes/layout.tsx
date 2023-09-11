import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import { Page } from "~/components";
import Private from "./private";

export const useUser = routeLoader$(({ sharedMap }) => {
  return JSON.parse(sharedMap.get("user"));
});

export const onRequest: RequestHandler = async ({
  sharedMap,
  cookie,
  env,
  next,
  pathname,
  redirect,
}) => {
  const user = cookie.get(env.get("SESSION_COOKIE")!);
  sharedMap.set("user", JSON.stringify(user));

  if (pathname === "/login/") {
    if (user) {
      throw redirect(302, "/users");
    }
  } else {
    if (!user) {
      throw redirect(302, "/login");
    }
  }

  await next();
};

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {
  const user = useUser();
  if (user.value) {
    return (
      <Private firstName={user.value.firstName}>
        <Slot />
      </Private>
    );
  }

  return (
    <Page>
      <Slot />
    </Page>
  );
});
