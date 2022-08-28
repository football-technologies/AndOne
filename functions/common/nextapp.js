const functions = require("firebase-functions");
// const express = require("express");
// const basicAuth = require("basic-auth-connect");
const { Nuxt } = require("nuxt");
const nuxtConfig = require("../nuxt.config.js");

const config = {
  ...nuxtConfig,
  dev: false,
  debug: false,
  buildDir: ".nuxt",
};
const nuxt = new Nuxt(config);
// const app = express();

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: "8GB",
};

// stagingには、basic認証が必要
// if (functions.config().basic.env === "staging") {
//   const USERNAME = functions.config().basic_auth.name;
//   const PASSWORD = functions.config().basic_auth.password;
//   app.use(basicAuth(USERNAME, PASSWORD));
//   app.use(async (req, res) => {
//     await nuxt.ready();
//     res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
//     nuxt.render(req, res);
//   });
//   module.exports = functions.runWith(runtimeOpts).https.onRequest(app);
// } else {
//   module.exports = functions
//     .runWith(runtimeOpts)
//     .https.onRequest(async (req, res) => {
//       await nuxt.ready();
//       res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
//       nuxt.render(req, res);
//     });
// }
module.exports = functions
  .runWith(runtimeOpts)
  .https.onRequest(async (req, res) => {
    await nuxt.ready();
    res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
    nuxt.render(req, res);
  });
