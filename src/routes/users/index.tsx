import { component$ } from "@builder.io/qwik";
import { routeLoader$, useNavigate } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

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
      <div class="flex gap-10 flex-col">
        <div class="text-sm breadcrumbs">
          <ul>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a>Users</a>
            </li>
          </ul>
        </div>
        <h1>Users's directory</h1>

        <div class="overflow-x-auto">
          <a href="/users/create" class="btn btn-primary float-right">
            Create
          </a>
          <table class="table">
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.value.map(({ id, firstName, lastName, email, role }) => (
                <tr key={id} onClick$={() => navigate(`/users/edit/${id}`)}>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{email}</td>
                  <td>{role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
});
