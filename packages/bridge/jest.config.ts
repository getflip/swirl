export default {
  resetMocks: true,
  roots: ["src"],
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["/node_modules/(?!uuid)"],
  setupFilesAfterEnv: ["<rootDir>/test-setup.ts"],
};
