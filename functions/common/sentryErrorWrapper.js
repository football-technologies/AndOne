const functions = require("firebase-functions");
const Sentry = require("@sentry/node");
Sentry.init({
  dsn: functions.config().sentry.dsn,
  environment: functions.config().basic.env,
});

module.exports = sentryWrapper =
  (fn) =>
  async (...args) => {
    try {
      return await fn(...args);
    } catch (err) {
      console.log(">>>>>> called sentryWrapper!!!", err);
      Sentry.captureException(err, {
        tags: {
          env: functions.config().basic.env,
          from: "functions",
        },
      });
      await Sentry.flush(2000);
      throw err;
    }
  };
