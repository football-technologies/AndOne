const dictionary = {
  status: [
    { id: 1, key: "OPEN", text: "アクティブ", color: "primary" },
    { id: 2, key: "PLAN", text: "一時停止", color: "#ccc" },
    { id: 3, key: "CLOSE", text: "削除", color: "pink lighten-2" },
    { id: 9, key: "KILL", text: "強制排除", color: "purple lighten-2" },
  ],

  userType: [
    { id: 1, key: "admin", text: "Admin", color: "#ccc" },
    { id: 10, key: "general", text: "General", color: "#999" },
  ],

  itemStatus: [
    {
      id: 1,
      key: "private",
      text: "下書き状態",
      icon: "MdEdit",
      color: "yellow",
    },
    {
      id: 2,
      key: "public",
      text: "公開中",
      icon: "MdPublic",
      color: "red",
    },
    {
      id: 3,
      key: "selling",
      text: "販売中",
      icon: "MdAlarmAdd",
      color: "orange",
    },
    {
      id: 4,
      key: "sold",
      text: "販売終了",
      icon: "MdAlarmOff",
      color: "black",
    },
  ],
};

export default dictionary;
