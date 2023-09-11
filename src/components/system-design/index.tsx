/** @jsxImportSource react */
// https://geist-ui.dev/en-us/components/loading
import { qwikify$ } from "@builder.io/qwik-react";
import * as Geist from "@geist-ui/core";
import type {
  TableColumnRender,
  TableColumnRender,
} from "@geist-ui/core/esm/table";
import type { CSSProperties } from "react";
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
            {errors.map((error: string) => (
              <p key={error}>{error}</p>
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
  columns: {
    prop: string;
    label: string;
    render?: TableColumnRender<any>;
  }[];
}
export const Table = qwikify$(
  (props: TableProps) => {
    return (
      <Geist.Table {...props.table}>
        {props.columns.map((column: any) => (
          <Geist.Table.Column
            key={column.prop}
            prop={column.prop}
            label={column.label}
            render={column.render}
          />
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
        {props.items.map((item) => (
          <Geist.Breadcrumbs.Item {...item} key={item.label}>
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

interface FlexProps extends CSSProperties {
  children: React.JSX.Element;
}

const Flex = ({ children, ...props }: FlexProps) => {
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

export const Navbar = qwikify$(
  (prop: { userName: string }) => {
    return (
      <>
        <Flex flexDirection="row" alignItems="center" height="3.5rem">
          <Flex gap="10px" justifyContent="space-between">
            <>
              <h2>Logo</h2>

              <nav
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  maxWidth: "max-content",
                  zIndex: 10,
                  gap: "10px",
                }}
              >
                <div style={{ position: "relative" }}>
                  <ul
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      listStyleType: "none",
                      gap: "10px",
                    }}
                  >
                    <li>Home</li>
                    <li>Home</li>
                    <li>Home</li>
                  </ul>
                </div>

                <Geist.Avatar text={prop.userName ?? "Dam"} scale={2} />
              </nav>
            </>
          </Flex>
        </Flex>
        <Geist.Divider />
      </>
    );
  },
  {
    clientOnly: true,
    eagerness: "visible",
  }
);

export const Modal = qwikify$(
  ({
    title,
    subtitle,
    content,
    visible,
    onClose,
    onAccept,
  }: {
    title: string;
    subtitle: string;
    content: string;
    visible: boolean;
    onClose: Function;
    onAccept: Function;
  }) => {
    return (
      <div>
        <Geist.Modal visible={visible} onClose={() => onClose()}>
          <Geist.Modal.Title>{title}</Geist.Modal.Title>
          <Geist.Modal.Subtitle>{subtitle}</Geist.Modal.Subtitle>
          <Geist.Modal.Content>
            <p>{content}</p>
          </Geist.Modal.Content>
          <Geist.Modal.Action onClick={() => onClose()}>
            Cancel
          </Geist.Modal.Action>
          <Geist.Modal.Action
            onClick={() => {
              onClose();

              onAccept();
            }}
          >
            Accept
          </Geist.Modal.Action>
        </Geist.Modal>
      </div>
    );
  },
  {
    clientOnly: true,
    eagerness: "visible",
  }
);
