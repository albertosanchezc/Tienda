const { defineConfig } = require("cypress");

module.exports = {
  // Toma capturas automáticas en fallos
  // screenshotOnRunFailure: true,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};

module.exports = {
  e2e: {
    viewportWidth: 1800,
    viewportHeight: 1080,
  },
};
