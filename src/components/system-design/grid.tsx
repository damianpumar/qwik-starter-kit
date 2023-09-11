import { qwikify$ } from "@builder.io/qwik-react";
import * as Geist from "@geist-ui/core";
import type { CSSProperties } from "react";

interface FlexProps extends CSSProperties {
  children: any;
}

export const Flex = ({ children, ...props }: FlexProps) => {
  return (
    <div
      style={{
        ...props,
        display: "flex",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};

export const VStack = ({ children }: FlexProps) => {
  return (
    <Flex flexDirection="column" gap="10px">
      {children}
    </Flex>
  );
};

export const HStack = ({ children }: FlexProps) => {
  return (
    <Flex flexDirection="row" justifyContent="space-between" gap="10px">
      {children}
    </Flex>
  );
};

export const Center = ({ children }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

export const Grid = qwikify$(Geist.Grid, {
  clientOnly: true,
  eagerness: "visible",
});

export const Container = qwikify$(Geist.Grid.Container, {
  clientOnly: true,
  eagerness: "visible",
});
