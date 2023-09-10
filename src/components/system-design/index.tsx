/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";
import * as Geist from "@geist-ui/core";
import type { InputProps } from "@geist-ui/core/esm/input";
import { useState } from "react";

export const GeistProvider = qwikify$(Geist.GeistProvider);

export const CssBaseline = qwikify$(Geist.CssBaseline);

export const Page = qwikify$(Geist.Page, {
  clientOnly: true,
  eagerness: "visible",
});
export const Header = qwikify$(Geist.Page.Header, {
  clientOnly: true,
  eagerness: "visible",
});
export const Content = qwikify$(Geist.Page.Content, {
  clientOnly: true,
  eagerness: "visible",
});
export const Footer = qwikify$(Geist.Page.Footer, {
  clientOnly: true,
  eagerness: "visible",
});

export const Card = qwikify$(Geist.Card, {
  clientOnly: true,
  eagerness: "visible",
});
export const Button = qwikify$(Geist.Button, {
  clientOnly: true,
  eagerness: "visible",
});

interface InputProps extends Geist.InputProps, Geist.ScaleProps {
  initialValue?: string;
}

export const Input = qwikify$(
  (props: InputProps) => {
    const [input, setInput] = useState(props.initialValue);

    return (
      <Geist.Input
        {...props}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    );
  },
  {
    clientOnly: true,
    eagerness: "visible",
  }
);
export const Checkbox = qwikify$(Geist.Checkbox, {
  clientOnly: true,
  eagerness: "visible",
});
export const Text = qwikify$(Geist.Text, {
  clientOnly: true,
  eagerness: "visible",
});

interface TableProps {
  table: React.PropsWithChildren<Geist.TableProps<any>>;
  columns: { prop: string; label: string }[];
}
export const Table = qwikify$(
  (props: TableProps) => {
    return (
      <Geist.Table {...props.table}>
        {props.columns.map((column: any, i: number) => (
          <Geist.Table.Column key={i} prop={column.prop} label={column.label} />
        ))}
      </Geist.Table>
    );
  },
  {
    clientOnly: true,
    eagerness: "visible",
  }
);

interface BreadcrumbsProps extends Geist.BreadcrumbsProps {
  items: { href?: string; label: string }[];
}
export const Breadcrumbs = qwikify$(
  (props: BreadcrumbsProps) => {
    return (
      <Geist.Breadcrumbs {...props}>
        {props.items.map((item, i) => (
          <Geist.Breadcrumbs.Item {...item} key={i}>
            {item.label}
          </Geist.Breadcrumbs.Item>
        ))}
      </Geist.Breadcrumbs>
    );
  },
  {
    clientOnly: true,
    eagerness: "visible",
  }
);
