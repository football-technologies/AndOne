import useSyncTime from "@/helpers/clock";
import { ToFinish } from "@/plugins/filter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateItem } from "@/store/item";
import moment from "moment/moment";

const DisplayTimeToFinish = ({ item, isSync = false }) => {
  let currentSeconds;
  if (isSync) {
    currentSeconds = useSyncTime(1000);
  } else {
    currentSeconds = moment().unix();
  }
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      item &&
      item.itemStatus === 3 &&
      item.sale.finishedAt.seconds < currentSeconds
    ) {
      dispatch(
        updateItem({
          id: item.id,
          itemStatus: 4,
        })
      );
    }
  }, [currentSeconds]);

  return (
    <>
      {ToFinish({
        finishedSeconds: item.sale.finishedAt.seconds,
      })}
    </>
  );
};

export default DisplayTimeToFinish;
