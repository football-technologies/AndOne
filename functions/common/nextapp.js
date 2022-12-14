const functions = require("firebase-functions");
const { default: next } = require("next");
const nextConfig = require("../next.config.js");
const express = require("express");
const basicAuth = require("basic-auth-connect");

const nextjsServer = next({
  ...nextConfig,
  dev: false,
  conf: {
    distDir: ".next",
  },
});

const nextjsHandle = nextjsServer.getRequestHandler();

// cold start対策
// TODO: 料金が発生。不要な時は0に設定すること
const MIN_INSTANCE = functions.config().basic.env === "production" ? 0 : 0;

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: "8GB",
  minInstances: MIN_INSTANCE,
};

// 本番環境には、Basic Authをつける
if (functions.config().basic.env === "production") {
  const app = express();
  const USERNAME = functions.config().basic_auth.name;
  const PASSWORD = functions.config().basic_auth.password;
  app.use(basicAuth(USERNAME, PASSWORD));

  app.use(async (req, res) => {
    res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
    return nextjsServer.prepare().then(() => nextjsHandle(req, res));
  });

  module.exports = functions
    .runWith(runtimeOpts)
    .https.onRequest(sentryWrapper(app));
} else {
  module.exports = functions
    .runWith(runtimeOpts)
    .https.onRequest(async (req, res) => {
      // exports.nextjsFunc = https.onRequest((req, res) => {
      res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
      return nextjsServer.prepare().then(() => nextjsHandle(req, res));
    });
}
