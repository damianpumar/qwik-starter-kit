/** @jsxImportSource react */

import { qwikify$ } from "@builder.io/qwik-react";
import * as Geist from "@geist-ui/core";
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
export const Button = qwikify$(
  (props: Geist.ButtonProps & Geist.ScaleProps & { href?: string }) => {
    if (props.href) {
      return (
        <Geist.Link href={props.href} {...props}>
          <Geist.Button {...props}>{props.children}</Geist.Button>
        </Geist.Link>
      );
    }

    return <Geist.Button {...props}>{props.children}</Geist.Button>;
  },
  {
    clientOnly: true,
    eagerness: "visible",
  }
);

type InputProps = Geist.InputProps &
  Geist.ScaleProps & {
    form: any;
  };

export const Input = qwikify$(
  ({ form, ...props }: InputProps) => {
    const [value, setValue] = useState(props.value);
    const hasFormErrors =
      form?.failed && form?.fieldErrors && form?.fieldErrors[props.name!];
    const errors = hasFormErrors ? form?.fieldErrors[props.name!] : [];

    return (
      <>
        <Geist.Input
          {...props}
          type={hasFormErrors ? "error" : "default"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {hasFormErrors && (
          <span>
            {errors.map((error: string, i: number) => (
              <p key={i}>{error}</p>
            ))}
          </span>
        )}
      </>
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

export const Divider = qwikify$(
  () => {
    return <Geist.Divider />;
  },
  {
    clientOnly: true,
    eagerness: "visible",
  }
);

export const Avatar = qwikify$(Geist.Avatar, {
  clientOnly: true,
  eagerness: "visible",
});
