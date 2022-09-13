const Shop = require("./shop");
const Item = require("./item");
const User = require("./user");

exports.shop = { ...Shop };
exports.item = { ...Item };
exports.user = { ...User };

if (
  !process.env.K_SERVICE ||
  /^v1\-firestore\-shop\-/.test(process.env.K_SERVICE)
) {
  const Shop = require("./shop");
  exports.shop = { ...Shop };
}

if (
  !process.env.K_SERVICE ||
  /^v1\-firestore\-item\-/.test(process.env.K_SERVICE)
) {
  const Item = require("./item");
  exports.item = { ...Item };
}

if (
  !process.env.K_SERVICE ||
  /^v1\-firestore\-user\-/.test(process.env.K_SERVICE)
) {
  const User = require("./user");
  exports.user = { ...User };
}