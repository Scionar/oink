module.exports = {
  extends: [
    "next",
    "turbo",
    "prettier"
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/no-unescaped-entities": ["error", { forbid: [">", '"', "}"] }],
    "react/jsx-key": "off",
  },
};
