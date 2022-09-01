// const Auth = require("./auth");
// const User = require("./user");
// exports.auth = { ...Auth };
// exports.user = { ...User };

if (
  !process.env.K_SERVICE ||
  /^v1\-firestore\-user\-/.test(process.env.K_SERVICE)
) {
  const User = require("./user");
  exports.user = { ...User };
}

if (
  !process.env.K_SERVICE ||
  /^v1\-firestore\-auth\-/.test(process.env.K_SERVICE)
) {
  const Auth = require("./auth");
  exports.auth = { ...Auth };
}
