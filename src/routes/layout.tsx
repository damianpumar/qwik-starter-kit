import { component$, Slot, $ } from "@builder.io/qwik";
import {
  routeLoader$,
  type RequestHandler,
  routeAction$,
} from "@builder.io/qwik-city";
import Private from "./private";

export const useUser = routeLoader$(({ sharedMap }) => {
  const user = sharedMap.get("user")?.value;

  if (user) {
    const { id, firstName, lastName } = JSON.parse(user);
    return {
      id,
      fullName: `${firstName} ${lastName}`,
      isLoggedIn: true,
    };
  }

  return {
    isLoggedIn: false,
  };
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
  sharedMap.set("user", user);

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

export const useLogoutUser = routeAction$((_, { cookie, env, redirect }) => {
  cookie.set(env.get("SESSION_COOKIE")!, -1, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    maxAge: -1,
  });

  throw redirect(302, "/login");
});

export default component$(() => {
  const user = useUser();
  const logout = useLogoutUser();
  const onLogout = $(() => logout.submit());

  const userFullName = user.value.fullName ?? "";

  if (user.value.isLoggedIn) {
    return (
      <Private
        fullName={userFullName}
        items={[{ label: "Logout", action: onLogout }]}
      >
        <Slot />
      </Private>
    );
  }

  return <Slot />;
});
