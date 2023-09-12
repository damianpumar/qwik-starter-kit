import { component$, useSignal } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

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

  const errors = (name: string) => {
    const hasFormErrors =
      editUserAction.value?.failed &&
      !!editUserAction.value.fieldErrors &&
      !!editUserAction.value.fieldErrors[name];

    return hasFormErrors ? editUserAction.value.fieldErrors[name] : [];
  };

  return (
    <>
      <div class="text-sm breadcrumbs">
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/users">Users</a>
          </li>
          <li>
            <a>Edit</a>
          </li>
        </ul>
      </div>
      <Form action={editUserAction} style={{ width: "100%" }}>
        <div class="form-control">
          <label class="label">
            <span class="label-text">First name</span>
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            class="input input-bordered"
            value={user.value?.firstName}
          />
          {editUserAction.value?.failed && (
            <span>
              {errors("firstName").map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </span>
          )}
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Last name</span>
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            class="input input-bordered"
            value={user.value?.lastName}
          />
          {editUserAction.value?.failed && (
            <span>
              {errors("lastName").map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </span>
          )}
        </div>

        <div class="flex gap-5 flex-row mt-5">
          <button
            class="btn btn-error"
            type="button"
            onclick="deleteModal.showModal()"
          >
            Delete
          </button>
          <button class="btn">Save</button>
        </div>
      </Form>

      <dialog id="deleteModal" class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg">Delete!</h3>
          <p class="py-4">Are you sure to delete this user?</p>
          <div class="modal-action">
            <form action="" class="flex flex-row gap-5">
              <button
                type="button"
                class="btn btn-error"
                onClick$={() => onDeleteUser.submit({ id: user.value!.id })}
              >
                Delete
              </button>

              <button class="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
});
