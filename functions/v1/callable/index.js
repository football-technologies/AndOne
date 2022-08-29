const busketCallableFunctions = {
  hello: "./hello",
};

const loadCallableFunctions = (funcs) => {
  for (let name in funcs) {
    if (
      !process.env.K_SERVICE ||
      process.env.K_SERVICE === `v1-callable-${name}`
    ) {
      exports[name] = require(funcs[name]);
    }
  }
};

loadCallableFunctions(busketCallableFunctions);
