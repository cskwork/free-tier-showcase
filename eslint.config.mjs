import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // Stylistic rules that don't catch correctness bugs — turn off so
      // copy ("we'd reach for…") doesn't fail CI.
      "react/no-unescaped-entities": "off",
      "import/no-anonymous-default-export": "off",
    },
  },
];

export default config;
