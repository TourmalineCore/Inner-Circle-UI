import { defineConfig } from 'cypress';
import mochawesomeWriter from 'cypress-mochawesome-reporter/plugin';

export default defineConfig({

  e2e: {
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporterOptions.json',
    },
    viewportWidth: 1200,
    viewportHeight: 660,
    specPattern: 'cypress/e2e/**/*.cy.js',
    baseUrl: 'http://localhost:3000',
    video: false,
    setupNodeEvents(on, config) {
      mochawesomeWriter(on, config);
    },
  },
});
