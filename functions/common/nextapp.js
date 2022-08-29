const functions = require("firebase-functions");
const { default: next } = require("next");
const nextConfig = require("../next.config.js");

const nextjsServer = next({
  ...nextConfig,
  dev: false,
  conf: {
    distDir: ".next",
  },
});
const nextjsHandle = nextjsServer.getRequestHandler();

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: "8GB",
};

module.exports = functions
  .runWith(runtimeOpts)
  .https.onRequest(async (req, res) => {
    // exports.nextjsFunc = https.onRequest((req, res) => {
    res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
    return nextjsServer.prepare().then(() => nextjsHandle(req, res));
  });

// const config = {
//   ...nextConfig,
//   dev: false,
//   debug: false,
//   buildDir: ".next",
// };

// const next = new Next(config);

// const runtimeOpts = {
//   timeoutSeconds: 540,
//   memory: "8GB",
// };

// module.exports = functions
//   .runWith(runtimeOpts)
//   .https.onRequest(async (req, res) => {
//     await next.ready();
//     res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
//     next.render(req, res);
//   });
