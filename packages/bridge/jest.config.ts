export default {
  resetMocks: true,
  roots: ["src"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/test-setup.ts"],
};
