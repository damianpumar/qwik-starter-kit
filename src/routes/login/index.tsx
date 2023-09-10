import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, type DocumentHead } from "@builder.io/qwik-city";
import { Button, Card, Checkbox, Input, Page, Text } from "~/components";
import { Center, Container, Flex } from "~/components/system-design/grid";

export const useLogin = routeAction$(async (data, { cookie, env }) => {
  cookie.set(env.get("SESSION_COOKIE")!, 123, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
  });

  return {
    success: true,
    firstname: data.firstname,
    last: data.last,
  };
});

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

                  <Input w={24} placeholder="Username" name="firstname" />
                  <Input
                    w={24}
                    placeholder="Password"
                    htmlType="password"
                    name="lastname"
                  />

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
