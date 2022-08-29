/** @type {import('next').NextConfig} */

const functions = require("firebase-functions");
let CURRENT_ENV = process.env.NODE_ENV;
if (functions.config().basic) {
  CURRENT_ENV = functions.config().basic.env;
} else {
  CURRENT_ENV = process.env.NODE_ENV;
}

console.log(">>>>>>>  CURRENT_ENV", CURRENT_ENV);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: CURRENT_ENV,
};

module.exports = nextConfig;
