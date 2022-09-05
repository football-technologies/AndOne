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
  phone: {
    value: /^0[0-9]{1,3}-[0-9]{1,4}-[0-9]{4}$/,
    message: "電話番号の形式とは異なります",
  },
  url: {
    value: /^[a-zA-Z0-9-]*$/,
    message: "半角英数字とハイフンのみがご利用できます",
  },
};
export default rules;
