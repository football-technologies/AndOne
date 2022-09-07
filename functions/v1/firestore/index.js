// const Auth = require("./auth");
// const User = require("./user");
const Shop = require("./shop");
// exports.auth = { ...Auth };
// exports.user = { ...User };
exports.shop = { ...Shop };

if (
  !process.env.K_SERVICE ||
  /^v1\-firestore\-shop\-/.test(process.env.K_SERVICE)
) {
  const Shop = require("./shop");
  exports.shop = { ...Shop };
}
