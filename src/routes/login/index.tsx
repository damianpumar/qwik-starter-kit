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
  async (data, { cookie, env, redirect }) => {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: data.email,
        password: data.password,
      },
    });

    cookie.set(env.get("SESSION_COOKIE")!, user.id, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
    });

    throw redirect(302, "/users");
  },
  zod$({
    email: z.string().email(),
    password: z.string(),
  })
);

export default component$(() => {
  const action = useLogin();

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
              <Form action={action} style={{ width: "100%" }}>
                <Flex direction="column">
                  <Text h2 my={0}>
                    Login
                  </Text>

                  <Input w={24} placeholder="Email" name="email" />
                  {action.value?.failed && (
                    <p>{action.value.fieldErrors?.email}</p>
                  )}
                  <Input
                    w={24}
                    placeholder="Password"
                    htmlType="password"
                    name="password"
                  />
                  {action.value?.failed && (
                    <p>{action.value.fieldErrors?.password}</p>
                  )}

                  <Checkbox scale={1.5} checked={true}>
                    Remember
                  </Checkbox>
                  <Button type="secondary" mt="10px" htmlType="submit">
                    Login
                  </Button>
                </Flex>
              </Form>
              {action.value?.success && (
                <>
                  <h2>Logged in</h2>
                  {action.value.firstname}
                </>
              )}
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
