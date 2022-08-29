const functions = require("firebase-functions");
const { Next } = require("next");
const nextConfig = require("../next.config.js");

const config = {
  ...nextConfig,
  dev: false,
  debug: false,
  buildDir: ".next",
};
const next = new Next(config);

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: "8GB",
};

module.exports = functions
  .runWith(runtimeOpts)
  .https.onRequest(async (req, res) => {
    await next.ready();
    res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
    next.render(req, res);
  });
