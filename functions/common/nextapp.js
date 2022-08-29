const functions = require("firebase-functions");
// const express = require("express");
// const basicAuth = require("basic-auth-connect");
const { Next } = require("next");
const nextConfig = require("../next.config.js");

const config = {
  ...nextConfig,
  dev: false,
  debug: false,
  buildDir: ".next",
};
const next = new Next(config);
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
//     await next.ready();
//     res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
//     next.render(req, res);
//   });
//   module.exports = functions.runWith(runtimeOpts).https.onRequest(app);
// } else {
//   module.exports = functions
//     .runWith(runtimeOpts)
//     .https.onRequest(async (req, res) => {
//       await next.ready();
//       res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
//       next.render(req, res);
//     });
// }
module.exports = functions
  .runWith(runtimeOpts)
  .https.onRequest(async (req, res) => {
    await next.ready();
    res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
    next.render(req, res);
  });
