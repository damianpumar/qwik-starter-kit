import { component$ } from "@builder.io/qwik";

export interface MenuItem {
  label: string;
  action: Function;
}

interface NavbarProps {
  userName: string;
  items: MenuItem[];
}

export const Navbar = component$(({ userName, items }: NavbarProps) => {
  const userInitials = userName
    .split(" ")
    .map((letter) => letter[0])
    .join("");

  return (
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <div class="btn btn-ghost normal-case text-xl">The platform</div>
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <div tabIndex={0} class="avatar placeholder btn btn-ghost btn-circle">
            <div class="bg-neutral-focus text-neutral-content rounded-full w-8">
              <span class="text-xs uppercase">{userInitials}</span>
            </div>
          </div>
          <ul
            tabIndex={0}
            class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {items.map(({ label, action }) => (
              <li key={label}>
                <a onClick$={() => action()}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});
