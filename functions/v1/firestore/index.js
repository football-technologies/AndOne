const Shop = require("./shop");
const Item = require("./item");
const User = require("./user");
const Comment = require("./comment");
const Like = require("./like");
const Bidding = require("./bidding");

exports.shop = { ...Shop };
exports.item = { ...Item };
exports.user = { ...User };
exports.comment = { ...Comment };
exports.like = { ...Like };
exports.bidding = { ...Bidding };

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

if (
  !process.env.K_SERVICE ||
  /^v1\-firestore\-comment\-/.test(process.env.K_SERVICE)
) {
  const Comment = require("./comment");
  exports.comment = { ...Comment };
}

if (
  !process.env.K_SERVICE ||
  /^v1\-firestore\-like\-/.test(process.env.K_SERVICE)
) {
  const Like = require("./like");
  exports.like = { ...Like };
}

if (
  !process.env.K_SERVICE ||
  /^v1\-firestore\-bidding\-/.test(process.env.K_SERVICE)
) {
  const Bidding = require("./bidding");
  exports.bidding = { ...Bidding };
}
