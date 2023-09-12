import { component$, Slot } from "@builder.io/qwik";
import { Navbar } from "~/components";

export default component$((props: { fullName: string; items: any[] }) => {
  return (
    <div class="container mx-auto">
      <Navbar userName={props.fullName} items={props.items} />

      <Slot />
    </div>
  );
});
