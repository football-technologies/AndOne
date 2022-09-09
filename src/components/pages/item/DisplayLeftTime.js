import React from "react";
import { ToFinish } from "@/plugins/filter";

const DisplayLeftTime = ({ currentSeconds, finishedSeconds }) => {
  return (
    <>
      <div>{currentSeconds}</div>
      <div>{finishedSeconds}</div>
      <h6>{ToFinish({ currentSeconds, finishedSeconds })}</h6>
    </>
  );
};

export default DisplayLeftTime;
