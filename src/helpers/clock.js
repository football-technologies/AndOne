import { useEffect, useState } from "react";

export const GetCurrentSeconds = (interval) => {
  // console.log(">>>>>>>> Date.now", Date.now());

  const [time, updateTime] = useState(Date.now());

  useEffect(() => {
    const timeoutId = setTimeout(() => updateTime(Date.now()), interval);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [time]);

  return Math.floor(time / 1000); // msec -> sec に変換
};

export default GetCurrentSeconds;
