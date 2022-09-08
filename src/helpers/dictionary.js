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
    { id: 1, key: "private", text: "下書き", color: "primary" },
    { id: 2, key: "public", text: "公開中", color: "#ccc" },
    { id: 3, key: "selling", text: "販売中", color: "pink lighten-2" },
    { id: 9, key: "sod", text: "販売終了", color: "purple lighten-2" },
  ],
};

export default dictionary;
