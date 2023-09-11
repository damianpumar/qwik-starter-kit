import { component$, $ } from "@builder.io/qwik";
import { routeLoader$, useNavigate } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import { Breadcrumbs, Button, Header, Table, Text } from "~/components";

export const useGetUsers = routeLoader$(async () => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  return users;
});

export default component$(() => {
  const users = useGetUsers();
  const navigate = useNavigate();

  return (
    <>
      <Breadcrumbs items={[{ label: "Users" }]} />
      <Text h2>User's directory</Text>

      <Header>
        <Button
          href="/users/create"
          type="secondary"
          mb="10px"
          style={{ float: "right" }}
        >
          Create
        </Button>
      </Header>

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
          { prop: "action", label: "Action" },
        ]}
      />
    </>
  );
});
