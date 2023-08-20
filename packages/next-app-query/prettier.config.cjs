/** @type {import("prettier").Config} */
const config = {
  semi: true,
  printWidth: 120,
  singleQuote: true,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
};

module.exports = config;
