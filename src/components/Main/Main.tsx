import React from "react";
import BasicWindow from "../BasicWindow/BasicWindow";
import ManageTok from "../ManageTok/ManageTok";

const Main = () => {
  return (
    <div>
      <div>
        <BasicWindow />
      </div>
      <div>
        <ManageTok />
      </div>
    </div>
  );
};

export default Main;
