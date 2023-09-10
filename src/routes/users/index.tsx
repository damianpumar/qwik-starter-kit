import { component$, $ } from "@builder.io/qwik";
import { routeLoader$, useNavigate } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import { Breadcrumbs, Page, Table, Text } from "~/components";

export const useGetUsers = routeLoader$(async () => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  return users;
});

export default component$(() => {
  const users = useGetUsers();
  const navigate = useNavigate();

  return (
    <Page>
      <Breadcrumbs items={[{ label: "Users" }]} />
      <Text h2>User's directory</Text>
      <Table
        table={{
          data: users.value,
          onRow: $((element: any) => navigate(`/users/edit/${element.id}`)),
        }}
        columns={[
          { prop: "firstName", label: "First name" },
          { prop: "lastName", label: "Last name" },
          { prop: "email", label: "Email" },
          { prop: "role", label: "Role" },
        ]}
      />
    </Page>
  );
});
