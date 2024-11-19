import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    fixturesFolder: false,
    supportFile: false,
    specPattern: "src/main/test/cypress/integration",
  },
});
