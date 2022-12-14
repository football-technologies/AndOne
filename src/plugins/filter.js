import moment from "moment";

const ToFinish = ({ finishedSeconds }) => {
  const currentDate = moment();
  const targetDate = moment.unix(finishedSeconds);
  const diffSeconds = Math.floor(targetDate.diff(currentDate) / 1000); // msec -> sec
  const diffMins = Math.floor(targetDate.diff(currentDate) / 60000); // msec -> min

  if (diffMins < 0) {
    return "終了";
  } else if (diffMins === 0) {
    if (diffSeconds === 0) {
      return "終了";
    } else {
      return `残り
    ${diffSeconds}秒`;
    }
  } else if (diffMins < 60) {
    return `残り
    ${diffMins}分${diffSeconds % 60}秒`;
  } else if (diffMins < 60 * 24) {
    const diffHour = Math.floor(diffMins / 60);
    return `残り
    ${diffHour}時間${diffMins % 60}分`;
  } else if (diffMins < 60 * 24 * 30) {
    const diffDay = Math.floor(diffMins / (60 * 24));
    return `残り
    ${diffDay}日`;
  } else {
    return moment.unix(finishedSeconds).format("YYYY/MM/DD");
  }
};

const ToAgo = ({ seconds }) => {
  const currentDate = moment();
  const targetDate = moment.unix(seconds);
  const diffMins = Math.floor(currentDate.diff(targetDate) / 60000); // msec -> min

  if (diffMins <= 0) {
    return "now";
  } else if (diffMins < 60) {
    return `${diffMins} mins ago`;
  } else if (diffMins < 60 * 24) {
    const diffHour = Math.floor(diffMins / 60);
    return `${diffHour} hours ago`;
  } else if (diffMins < 60 * 24 * 30) {
    const diffDay = Math.floor(diffMins / (60 * 24));
    return `${diffDay} days ago`;
  } else {
    return moment.unix(seconds).format("YYYY/MM/DD");
  }
};

const ToTime = ({ seconds }) => {
  return seconds ? moment.unix(seconds).format("HH:mm") : "";
};

const ToDate = ({ seconds }) => {
  return seconds ? moment.unix(seconds).format("MM/DD") : "";
};

const ToDateTime = ({ seconds }) => {
  return seconds ? moment.unix(seconds).format("MM/DD HH:mm") : "";
};

const ToFullDate = ({ seconds }) => {
  return seconds ? moment.unix(seconds).format("YYYY/MM/DD HH:mm") : "";
};

const ToPrice = (number) => {
  if (number) {
    // 四捨五入は切り捨て
    return `${Math.floor(number).toLocaleString()}円`;
  } else if (number === 0) {
    return "0円";
  } else {
    return "";
  }
};

export { ToFinish, ToFullDate, ToDateTime, ToDate, ToTime, ToAgo, ToPrice };
