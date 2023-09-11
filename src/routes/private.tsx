import { component$, Slot } from "@builder.io/qwik";
import { Page, Navbar } from "~/components";

export default component$((props: { fullName: string; items: any[] }) => {
  return (
    <Page>
      <Navbar {...props} />

      <Slot />
    </Page>
  );
});
