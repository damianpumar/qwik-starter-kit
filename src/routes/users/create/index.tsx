import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import { Breadcrumbs, Button, Input, Text } from "~/components";
import { Container, Flex } from "~/components/system-design/grid";

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
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Users", href: "/users" }, { label: "Create" }]}
      />
      <Text h2>Create user</Text>

      <Container gap={1} w="400px">
        <Form action={createUserAction} style={{ width: "100%" }}>
          <Flex direction="column">
            <Input
              w={24}
              placeholder="First name"
              name="firstName"
              form={createUserAction.value}
            />
            <Input
              w={24}
              placeholder="Last name"
              name="lastName"
              form={createUserAction.value}
            />

            <Input
              w={24}
              placeholder="Email"
              name="email"
              form={createUserAction.value}
            />

            <Input
              w={24}
              placeholder="Password"
              name="password"
              htmlType="password"
              form={createUserAction.value}
            />

            <Button type="secondary" mt="10px" htmlType="submit">
              Save
            </Button>
          </Flex>
        </Form>
      </Container>
    </>
  );
});
