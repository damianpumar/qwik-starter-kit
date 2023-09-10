import { component$, Slot } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";
import { CssBaseline, GeistProvider } from "~/components";

// export const useUser = routeLoader$(({ sharedMap }) => {
//   return sharedMap.get("user");
// });

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
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  return (
    <GeistProvider>
      <CssBaseline />
      <Slot />
    </GeistProvider>
  );
});
