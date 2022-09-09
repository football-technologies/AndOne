// 共通化したい処理
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/plugins/firebase";
import { getDocs, where, collection, query, orderBy } from "firebase/firestore";
import { ToPrice } from "@/plugins/filter";

const ftCreateId = (idName) => {
  const now = moment();
  const uuid = uuidv4().split("-")[0];
  const id = idName + "-" + now.format("YYYYMMDDHH") + "-" + uuid;
  return id;
};

const currentBiddingPrice = ({ itemId, startPrice }) => {
  const biddings = [];
  const q = query(
    collection(db, `items/${itemId}/biddings`),
    where("item.id", "==", itemId),
    orderBy("price", "desc")
  );

  getDocs(q).then((snapshot) => {
    snapshot.forEach((doc) => {
      if (doc.id) {
        biddings.push(doc.data());
      }
    });
  });

  if (biddings.length === 0) {
    return ToPrice(startPrice);
  } else {
    return ToPrice(biddings[0].price);
  }
};

export { ftCreateId, currentBiddingPrice };
