import { component$, Slot } from "@builder.io/qwik";
import { Page, Navbar, Header } from "~/components";

export default component$(({ firstName }: { firstName: string }) => {
  return (
    <Page>
      <Header>
        <Navbar userName={firstName} />
      </Header>

      <Slot />
    </Page>
  );
});
