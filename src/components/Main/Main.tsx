import React from "react";
import BasicWindow from "../BasicWindow/BasicWindow";
import ManageTok from "../ManageTok/ManageTok";

const Main = () => {
  return (
    <div>
      <div className="colorhead">
        <BasicWindow />
      </div>
      <div className="colorsecond">
        <ManageTok />
      </div>
    </div>
  );
};

export default Main;
