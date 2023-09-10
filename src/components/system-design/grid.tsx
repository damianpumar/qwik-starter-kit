import type * as CSS from "csstype";
import { qwikify$ } from "@builder.io/qwik-react";
import * as Geist from "@geist-ui/core";

export const Flex = ({
  children,
  direction: flexDirection,
}: {
  direction: CSS.Property.FlexDirection | undefined;
  children: any;
}) => {
  return (
    <div
      style={{
        gap: "10px",
        display: "flex",
        flexDirection,
        justifyContent: "space-between",
        alignItems: "stretch",
        width: "100%",
      }}
    >
      {children}
    </div>
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
