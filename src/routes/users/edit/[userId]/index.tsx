import { component$ } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import { Breadcrumbs, Button, Input, Text } from "~/components";
import { Container, Flex } from "~/components/system-design/grid";

export const useGetUser = routeLoader$(async ({ params, status }) => {
  const userId = params["userId"];

  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    status(404);
  }

  return user;
});

export const useEditUser = routeAction$(
  async (data, { redirect, params }) => {
    const userId = params["userId"];
    const prisma = new PrismaClient();

    await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });

    throw redirect(302, "/users");
  },
  zod$({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
  })
);

export default component$(() => {
  const user = useGetUser();
  const editUserAction = useEditUser();

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Users", href: "/users" }, { label: "Edit" }]}
      />
      <Text h2>Edit user</Text>

      <Container gap={1} w="400px">
        <Form action={editUserAction} style={{ width: "100%" }}>
          <Flex direction="column">
            <Input
              w={24}
              placeholder="First name"
              name="firstName"
              value={user.value?.firstName}
              form={editUserAction.value}
            />
            <Input
              w={24}
              placeholder="Last name"
              name="lastName"
              value={user.value?.lastName}
              form={editUserAction.value}
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
