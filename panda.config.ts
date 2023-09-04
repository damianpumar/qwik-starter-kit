import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  jsxFramework: "qwik",

  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    // 👇🏻 Define your tokens here
    extend: {
      tokens: {
        colors: {
          primary: { value: "#fff" },
          secondary: { value: "#111" },
          red: { value: "#e00" },
          blue: { value: "#0070f3" },
          yellow: { value: "#f7b955" },
        },
      },
      semanticTokens: {
        colors: {
          danger: { value: "{colors.red}" },
          success: { value: "{colors.blue}" },
          warning: { value: "{colors.yellow}" },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "src/styled-system",
});
