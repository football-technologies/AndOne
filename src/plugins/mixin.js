// 共通化したい処理
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

exports.ftCreateId = function (idName) {
  const now = moment();
  const uuid = uuidv4().split("-")[0];
  const id = idName + "-" + now.format("YYYYMMDDHH") + "-" + uuid;
  return id;
};
