import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

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
      '@typescript-eslint/no-unused-vars': 'off'
    }
  },
  {
    files: ["src/**/*.{js,ts,jsx,tsx}"],
    ignores: ["src/repository/**/*.{js,ts,jsx,tsx}", "src/services/**/*.{js,ts,jsx,tsx}", "src/lib/prisma.ts"],
    rules: {
      // Prevent direct Prisma usage outside the repository layer
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@prisma/client",
              message: "Use the repository layer instead of direct Prisma imports.",
            },
            {
              name: "@/lib/prisma",
              message: "Use the repository layer instead of direct Prisma imports.",
            }
          ],
          patterns: ["@prisma/client/**"],
        },
      ],
    }
  }
];

export default eslintConfig;
