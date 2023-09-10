import { qwikify$ } from "@builder.io/qwik-react";
import * as Geist from "@geist-ui/core";

export const GeistProviderQwik = qwikify$(Geist.GeistProvider);

export const CssBaselineQwik = qwikify$(Geist.CssBaseline);

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
export const Input = qwikify$(Geist.Input, {
  clientOnly: true,
  eagerness: "visible",
});
export const Checkbox = qwikify$(Geist.Checkbox, {
  clientOnly: true,
  eagerness: "visible",
});
export const Text = qwikify$(Geist.Text, {
  clientOnly: true,
  eagerness: "visible",
});
