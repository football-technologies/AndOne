// const V1 = require("./v1");
// exports.v1 = { ...V1 };

const busketInitFunctions = {
  // Adminの設定ファイル。消してはダメ
  loadAdmininitializeApp: "./common/loadAdmininitializeApp",
};

const loadInitFunctions = (funcs) => {
  for (let name in funcs) {
    exports[name] = require(funcs[name]);
  }
};

loadInitFunctions(busketInitFunctions);

const busketFunctions = {
  // SentryのError設定ファイル。消してはダメ
  sentryErrorWrapper: "./common/sentryErrorWrapper",
  // nextapp: "./common/nextapp",
};

const loadFunctions = (funcs) => {
  for (let name in funcs) {
    if (!process.env.K_SERVICE || process.env.K_SERVICE === name) {
      exports[name] = require(funcs[name]);
    }
  }
};

loadFunctions(busketFunctions);
