import { component$, useSignal } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import { Breadcrumbs, Button, Input, Modal, Text } from "~/components";
import { Container, HStack, VStack } from "~/components/system-design/grid";

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

export const useDeleteUser = routeAction$(
  async (data, { redirect }) => {
    const prisma = new PrismaClient();
    await prisma.user.delete({
      where: {
        id: data.id,
      },
    });

    throw redirect(302, "/users");
  },
  zod$({
    id: z.string(),
  })
);

export default component$(() => {
  const user = useGetUser();
  const editUserAction = useEditUser();
  const onDeleteUser = useDeleteUser();
  const visible = useSignal(false);

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Users", href: "/users" }, { label: "Edit" }]}
      />
      <Text h2>Edit user</Text>

      <Container gap={1} w="400px">
        <Form action={editUserAction} style={{ width: "100%" }}>
          <VStack>
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

            <HStack>
              <Button
                type="error-light"
                mt="10px"
                htmlType="button"
                onClick$={() => {
                  visible.value = true;
                }}
              >
                Delete
              </Button>

              <Button type="secondary" mt="10px" htmlType="submit">
                Save
              </Button>
            </HStack>
          </VStack>
        </Form>
      </Container>

      <Modal
        visible={visible.value}
        onClose$={() => (visible.value = false)}
        onAccept$={() => onDeleteUser.submit({ id: user.value!.id })}
        title="Delete user?"
        content="Are you sure you want to delete a user?"
        subtitle={`${user.value?.firstName} ${user.value?.lastName}`}
      />
    </>
  );
});
