import { component$ } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  type DocumentHead,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import { Button, Card, Checkbox, Input, Page, Text } from "~/components";
import { Center, Container, Flex } from "~/components/system-design/grid";

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

  console.log(loginUser);

  return (
    <div
      style={{
        backgroundImage: "url(/images/background.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Page>
        <Center>
          <Card>
            <Container gap={1} w="400px">
              <Form action={loginUser} style={{ width: "100%" }}>
                <Flex direction="column">
                  <Text h2 my={0}>
                    Login
                  </Text>

                  <Input
                    w={24}
                    placeholder="Email"
                    name="email"
                    form={loginUser.value}
                  />

                  <Input
                    w={24}
                    placeholder="Password"
                    htmlType="password"
                    name="password"
                    form={loginUser.value}
                  />

                  <Checkbox scale={1.5} initialChecked name="remember">
                    Remember
                  </Checkbox>
                  <Button type="secondary" mt="10px" htmlType="submit">
                    Login
                  </Button>
                  {loginUser.value?.failed && loginUser.value.message}
                </Flex>
              </Form>
            </Container>
          </Card>
        </Center>
      </Page>
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
