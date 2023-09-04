import { component$ } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import Layout from "./layout";
import { Center, Flex } from "~/styled-system/jsx";
import { css } from "~/styled-system/css";

export default component$(() => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Center>
        <Flex gap="10em">
          Test
          <button
            onClick$={() => navigate("/login")}
            class={css({
              rounded: "sm",
              fontFamily: "mono",
              px: "4",
              py: "2",
              _hover: {
                bg: "gray.200",
              },
            })}
          >
            Go to Login
          </button>
        </Flex>
      </Center>
    </Layout>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
