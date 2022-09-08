// const Auth = require("./auth");
// const User = require("./user");
const Shop = require("./shop");
const Item = require("./item");
// exports.auth = { ...Auth };
// exports.user = { ...User };
exports.shop = { ...Shop };
exports.item = { ...Item };

if (
  !process.env.K_SERVICE ||
  /^v1\-firestore\-shop\-/.test(process.env.K_SERVICE)
) {
  const Shop = require("./shop");
  exports.shop = { ...Shop };
}

if (
  !process.env.K_SERVICE ||
  /^v1\-firestore\-shop\-/.test(process.env.K_SERVICE)
) {
  const Item = require("./item");
  exports.item = { ...Item };
}
