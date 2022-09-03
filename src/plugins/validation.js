const rules = {
  email: {
    value:
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: "メールアドレスの形式が異なります",
  },
  password: {
    value: /^([a-zA-Z0-9]{6,})$/,
    message: "半角英数字で6文字以上の入力が必要です",
  },
  name: {
    value: /^([a-zA-Z0-9])*$/,
    message: "半角英数字のみがご利用できます",
  },
};
export default rules;
