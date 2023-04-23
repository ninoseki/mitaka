/**
 * @type {import('prettier').Options}
 */
module.exports = {
  plugins: [require.resolve("@plasmohq/prettier-plugin-sort-imports")],
  importOrder: ["^@plasmo/(.*)$", "^@plasmohq/(.*)$", "^~(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderCaseInsensitive: true,
  importOrderMergeDuplicateImports: true,
};
