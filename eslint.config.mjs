import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import filenames from "eslint-plugin-filenames";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      // "src/app/(main)/tournament/public"
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    files: ["src/**/*.{js,ts,jsx,tsx}"],
    ignores: [
      "src/repository/**/*.{js,ts,jsx,tsx}",
      "src/lib/prisma.ts",
    ],
    rules: {
      // Prevent direct Prisma usage outside the repository layer
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@/lib/prisma",
              message:
                "Use the repository layer instead of direct Prisma imports.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/**/*.{js,ts,jsx,tsx}"],
    ignores: [
      "src/repository/**/*.{js,ts,jsx,tsx}",
      "**/*.service.ts",
      "src/lib/prisma.ts",
    ],
    rules: {
      // Prevent direct Prisma usage outside the repository layer
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@prisma/client",
              message:
                "Use the repository layer instead of direct Prisma imports.",
            },
          ],
          patterns: ["@prisma/client/**"],
        },
      ],
    },
  },
  //* After implementing the new folder structure, its a bit messy to enforce strict filename rules.
  //TODO So we will disable the filename case rule for now. Will enable it later.
  // {
  //   plugins: {
  //     unicorn: eslintPluginUnicorn,
  //     filenames,
  //   },
  //   rules: {
  //     // Enforce PascalCase for React component files
  //     "unicorn/filename-case": [
  //       "error",
  //       {
  //         cases: {
  //           pascalCase: true,
  //           kebabCase: true,
  //         },
  //       },
  //     ],
  //   },
  // },
  // // Enforce kebab-case in routing (Next.js pages/app directories)
  // {
  //   files: ["pages/**/*", "app/**/*"],
  //   rules: {
  //     "filenames/match-regex": ["error", "^[a-z0-9-]+$", true],
  //   },
  // },

  // // Enforce PascalCase in components
  // {
  //   files: ["components/**/*"],
  //   rules: {
  //     "filenames/match-regex": ["error", "^[A-Z][a-zA-Z0-9]*$", true],
  //   },
  // },

  // // Enforce camelCase for utilities, hooks, libs
  // {
  //   files: ["lib/**/*", "utils/**/*", "hooks/**/*"],
  //   rules: {
  //     "filenames/match-regex": ["error", "^[a-z][a-zA-Z0-9]*$", true],
  //   },
  // },

  // // Disable the rule in problematic folder
  // {
  //   files: [
  //     "src/app/(main)/(dev)/tasks/**/*",
  //     "src/hooks/**/*",
  //     "src/lookups/**/*",
  //     "src/types/**/*",
  //   ],
  //   rules: {
  //     "unicorn/filename-case": "off",
  //   },
  // },
];

export default eslintConfig;
