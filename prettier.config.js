/** @type {import('prettier').Config} */

module.exports = {
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  printWidth: 65,
  trailingComma: "es5",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "^(@prisma/*)",
    "<THIRD_PARTY_MODULES>",
    "^types$",
    "^@/libs/(.*)$|^@/libs$",
    "^@/types/(.*)$|^@/types$",
    "^@/configs/(.*)$|^@/configs$",
    "^@/utils/(.*)$|^@/utils$",
    "^@/hooks/(.*)$|^@/hooks$",
    "^@/components/ui/(.*)$|^@/components/ui$",
    "^@/components/(.*)$|^@/components$$",
    "^@/styles/(.*)$|^@/styles$",
    "^@/app/(.*)$|^@/app$",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
};
