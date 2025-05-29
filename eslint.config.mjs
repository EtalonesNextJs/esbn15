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
    rules: {
      "@typescript-eslint/no-explicit-any": "off",  // отключаем проверку на использование 'any'
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], // игнорируем неиспользуемые переменные (например, _unused)
      "prefer-const": "off", // отключаем правило prefer-const
      "react-hooks/exhaustive-deps": "off", // отключаем правило для хуков react
    },
  },
];

export default eslintConfig;
