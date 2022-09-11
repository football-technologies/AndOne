import { useEffect, useState } from "react";

export const useSyncTime = (interval) => {
  const [time, updateTime] = useState(Date.now());

  useEffect(() => {
    const timeoutId = setTimeout(() => updateTime(Date.now()), interval);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [time]);

  return Math.floor(time / 1000); // msec -> sec に変換
};

export default useSyncTime;
