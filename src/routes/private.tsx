import { component$, Slot } from "@builder.io/qwik";
import type { MenuItem } from "~/components";
import { Navbar } from "~/components";

interface PrivateProps {
  fullName: string;
  items: MenuItem[];
}

export default component$(({ fullName, items }: PrivateProps) => {
  return (
    <div class="container mx-auto">
      <Navbar userName={fullName} items={items} />

      <Slot />
    </div>
  );
});
