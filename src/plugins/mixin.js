// 共通化したい処理
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const ftCreateId = (idName) => {
  const now = moment();
  const uuid = uuidv4().split("-")[0];
  const id = idName + "-" + now.format("YYYYMMDDHH") + "-" + uuid;
  return id;
};

const currentBiddingPrice = ({ biddings = [], startPrice }) => {
  if (biddings.length === 0) {
    return startPrice;
  } else {
    const highestPrice = 0;
    for (const bidding of biddings) {
      if (bidding.price > highestPrice) {
        highestPrice = bidding.price;
      }
    }

    return highestPrice;
  }
};

export { ftCreateId, currentBiddingPrice };
