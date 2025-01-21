const { defineConfig } = require("cypress");

<<<<<<< HEAD
module.exports = defineConfig({
=======
module.exports = {
  // Toma capturas automáticas en fallos
  screenshotOnRunFailure: true,

>>>>>>> 763837c3426a44c5723ba81952901c4b01a08388
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
<<<<<<< HEAD
});
=======
};
>>>>>>> 763837c3426a44c5723ba81952901c4b01a08388
